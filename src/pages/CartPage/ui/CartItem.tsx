import { Link } from 'react-router-dom';
import s from './CartPage.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { cartActions, CartCounter } from 'features/cart';
import { TrashIcon } from 'shared/assets';
import { memo, useCallback } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type CartItemProps = {
	product: CartProduct;
};
export const CartItemComponent = ({ product }: CartItemProps) => {
	const dispatch = useDispatch();
	const { id, name, images, price, discount } = product;

	const handleDelete = useCallback(() => {
		dispatch(cartActions.deleteCartProduct(id));
	}, [dispatch, id]);
	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img
					src={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
				/>

				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<CartCounter productId={id} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span
										className={classNames(s['price_old'], s['price_right'])}>
										{price}
									</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<button className={classNames(s['cart-item__bnt-trash'])}>
							{/*<TrashIcon onClick={handleDelete} />*/}
							{/*<img*/}
							{/*	src={TrashIcon}*/}
							{/*	alt=''*/}
							{/*	width={18}*/}
							{/*	height={18}*/}
							{/*	onClick={handleDelete}*/}
							{/*/>*/}
							<DeleteOutlineIcon onClick={handleDelete} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const CartItem = memo(CartItemComponent);
