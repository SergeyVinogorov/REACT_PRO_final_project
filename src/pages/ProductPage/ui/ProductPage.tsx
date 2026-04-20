import s from './ProductPage.module.css';
import { useLocation /* better: useParams */ } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from 'shared/utils';
import { ButtonBack } from 'shared/ui/ButtonBack';
import { Rating } from 'shared/ui/Rating';
import { LikeButton } from 'features/products';
import { ReviewList } from 'widgets/ReviewList/ui/ReviewList';
import { CartCounter, cartSelectors } from 'features/cart';
import { useGetProductQuery } from 'features/products/api/productsApi';
import { ProductCartCounter } from './ProductCartCounter/ProductCartCounter';
import { qualitySVG, truckSVG } from 'shared/assets';

export const ProductPage = () => {
	const { pathname } = useLocation();
	const productId = pathname.split('/').at(-1) || '';

	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const { data: product } = useGetProductQuery({ id: productId });

	if (!product) return null;

	const { id, name, images, description, price, discount } = product;
	const isProductInCart = !!cartProducts.find((p) => p.id === id);

	return (
		<div className={classNames('container', s.page)}>
			<div className={s.topRow}>
				<ButtonBack />
			</div>

			<h1 className={s.pageTitle}>{name}</h1>

			<div className={s.meta}>
				<div className={s.article}>
					Артикул: <b>2388907</b>
				</div>
				<Rating rating={3} />
			</div>

			<div className={s.grid}>
				<div className={s.imageCol}>
					<div className={s.imageWrap}>
						<img className={s.image} src={images} alt={description} />
					</div>
				</div>

				<aside className={s.sidebar}>
					<div className={s.priceWrap}>
						<div className={classNames(s.priceWrapInner)}>
							<span className={classNames(s.priceOld)}>{`${price} ₽`}</span>
							<span className={classNames(s.priceDiscount)}>{`${
								price - discount
							} ₽`}</span>
						</div>
					</div>

					<div className={s.actions}>
						{isProductInCart ? (
							<CartCounter productId={id} />
						) : (
							<ProductCartCounter product={product} />
						)}
					</div>

					<div className={s.likeRow}>
						<LikeButton product={product} />
					</div>

					<div className={s.infoCard}>
						<img className={s.infoIcon} src={truckSVG} alt='truck' />
						<div>
							<h3 className={s.infoTitle}>Доставка по всему Миру!</h3>
							<p className={s.infoText}>
								Доставка курьером — <b>от 399 ₽</b>
							</p>
							<p className={s.infoText}>
								Доставка в пункт выдачи — <b>от 199 ₽</b>
							</p>
						</div>
					</div>

					<div className={s.infoCard}>
						<img className={s.infoIcon} src={qualitySVG} alt='quality' />
						<div>
							<h3 className={s.infoTitle}>Гарантия качества</h3>
							<p className={s.infoText}>
								Если Вам не понравилось качество нашей продукции, мы вернем
								деньги, либо сделаем все возможное, чтобы удовлетворить ваши
								нужды.
							</p>
						</div>
					</div>
				</aside>
			</div>

			<div className={s.details}>
				<h2 className={s.sectionTitle}>Описание</h2>
				<p className={s.sectionText}>Описание demo</p>

				<h2 className={s.sectionTitle}>Характеристики</h2>
				<div className={s.specGrid}>
					<div className={s.specName}>Вес</div>
					<div className={s.specValue}>1 шт 120-200 грамм</div>

					<div className={s.specName}>Цена</div>
					<div className={s.specValue}>490 ₽ за 100 грамм</div>

					<div className={s.specName}>Польза</div>
					<div className={s.specValue}>
						<p>
							Большое содержание аминокислот и микроэлементов оказывает
							положительное воздействие на общий обмен веществ собаки.
						</p>
						<p>Способствуют укреплению десен и жевательных мышц.</p>
						<p>
							Развивают зубочелюстной аппарат, отвлекают собаку во время смены
							зубов.
						</p>
						<p>
							Имеет цельную волокнистую структуру, при разжевывании получается
							эффект зубной щетки, лучше всего очищает клыки собак.
						</p>
						<p>Следует учесть высокую калорийность продукта.</p>
					</div>
				</div>
			</div>

			<div className={s.reviews}>
				<ReviewList product={product} />
			</div>
		</div>
	);
};
