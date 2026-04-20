import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from 'features/cart/ui/Price/Price';
import { Link } from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';
import { useAppSelector } from 'shared/utils';
import { CartCounter, cartSelectors, useAddToCart } from 'features/cart';
import { LikeButton } from 'features/products';

type CardProps = {
	product: Product;
};
const CardComponent = ({ product }: CardProps) => {
	const { discount, price, name, tags, id, images } = product;
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const isProductInCart = useMemo(
		() => cartProducts.some((p) => p.id === id),
		[cartProducts, id]
	);
	const { addProductToCart } = useAddToCart();
	const handleAddToCart = useCallback(() => {
		addProductToCart({ ...product, count: 1 });
	}, [addProductToCart, product]);

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<button
					onClick={handleAddToCart}
					disabled={isProductInCart}
					className={classNames(
						s['card__cart'],
						s['card__btn'],
						s['card__btn_type_primary']
					)}>
					В корзину
				</button>
			)}
		</article>
	);
};

export const Card = memo(CardComponent);
