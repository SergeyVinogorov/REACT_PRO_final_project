import { memo, useCallback, useMemo, useState } from 'react';
import s from './CartPage.module.css';
import classNames from 'classnames';
import { Modal } from 'shared/ui/Modal';
import { Button } from '@mui/material';

type CartAmountProps = {
	products: CartProduct[];
};
export const CartAmountComponent = ({ products }: CartAmountProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { allPrice, allDiscount, total } = useMemo(() => {
		const allPrice = products.reduce((acc, p) => p.price * p.count + acc, 0);
		const allDiscount = products.reduce(
			(acc, p) => p.discount * p.count + acc,
			0
		);
		return { allPrice, allDiscount, total: allPrice - allDiscount };
	}, [products]);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	const order = useMemo(
		() => products.map((p) => ({ id: p.id, count: p.count })),
		[products]
	);

	const confirmOrder = useCallback(() => {
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
		close();
	}, [order, close]);

	return (
		<>
			<div className={classNames(s['cart-amount'])}>
				<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
				<div className={classNames(s['cart-amount__table'])}>
					<div className={classNames(s['cart-amount__table-row'])}>
						<span className={classNames(s['cart-amount__table-title'])}>
							{`Товары (${products.length})`}
						</span>
						<span className={classNames(s['cart-amount__table-value'])}>
							{`${allPrice} ₽`}
						</span>
					</div>
					<div className={classNames(s['cart-amount__table-row'])}>
						<span className={classNames(s['cart-amount__table-title'])}>
							Скидка
						</span>
						<span
							className={classNames(
								s['cart-amount__table-value'],
								s['cart-amount__table-value-discount']
							)}>
							{`${allDiscount} ₽`}
						</span>
					</div>
				</div>
				<div className={classNames(s['cart-amount__total-cost'])}>
					<h2 className={classNames(s['cart-amount__total-cost-title'])}>
						Общая стоимость
					</h2>
					<span className={classNames(s['cart-amount__total-cost-value'])}>
						{`${total} ₽`}
					</span>
				</div>
				<button
					onClick={open}
					className={classNames(
						s['button'],
						s['button_type_primary'],
						s['button_type_wide']
					)}>
					Оформить заказ
				</button>
			</div>
			<Modal isOpen={isOpen} title='Подтверждение заказа' onClose={close}>
				<p style={{ marginTop: 0 }}>
					Проверьте состав заказа и подтвердите отправку.
				</p>
				<pre style={{ background: '#f6f7f8', padding: 12, borderRadius: 12 }}>
					{JSON.stringify(order, null, 2)}
				</pre>

				<div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
					<Button onClick={close} type='button'>
						Отмена
					</Button>
					<Button onClick={confirmOrder} type='button'>
						Подтвердить
					</Button>
				</div>
			</Modal>
		</>
	);
};

export const CartAmount = memo(CartAmountComponent);
