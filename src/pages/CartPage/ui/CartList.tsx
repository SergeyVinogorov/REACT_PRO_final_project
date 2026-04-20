import s from './CartPage.module.css';
import classNames from 'classnames';
import { CartItem } from './CartItem';
import { memo, useMemo } from 'react';

type CartListProps = {
	products: CartProduct[];
};
export const CartListComponent = ({ products }: CartListProps) => {
	const items = useMemo(
		() => products.map((p) => <CartItem product={p} key={p.id} />),
		[products]
	);
	return <div className={classNames(s['cart-list'])}>{items}</div>;
};

export const CartList = memo(CartListComponent);
