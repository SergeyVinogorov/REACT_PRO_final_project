import s from './CartPage.module.css';
import classNames from 'classnames';
import { cartSelectors } from 'features/cart/model/cart';
import { CartList } from './CartList';
import { CartAmount } from './CartAmount';
import { useAppSelector } from 'shared/utils';
import { Link } from 'react-router-dom';

export const CartPage = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	if (!products.length) {
		return (
			<div className={classNames('container', 'page')}>
				<h1 className={s.pageTitle}>Товаров нет в корзине</h1>
				<Link to='/products' className={s.backToCatalog}>
					Перейти в каталог
				</Link>
			</div>
		);
	}

	return (
		<div className={classNames(s.content, s.container, 'page')}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{products.length}</span> товаров в корзине
				</div>

				<CartList products={products} />
				<CartAmount products={products} />
			</div>
		</div>
	);
};
