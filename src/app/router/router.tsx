import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from 'pages/HomePage';
import { ProductPage } from 'pages/ProductPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { SignUpPage } from 'pages/SignUpPage';
import { SignInPage } from 'pages/SignInPage';
import { CartPage } from 'pages/CartPage';
import { App } from 'app/App';
import { WithProtection } from 'app/HOCs/WithProtection';
import { ProductsPage } from 'pages/ProductsPage';

export enum AppRoutes {
	HOME = 'home',
	FAVORITES = 'favorites',
	PRODUCTS = 'products',
	PRODUCT = 'product',
	PROFILE = 'profile',
	CART = 'cart',
	SIGNUP = 'signup',
	SIGNIN = 'signin',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, `/${string}` | '*'> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.FAVORITES]: '/favorites',
	[AppRoutes.PRODUCTS]: '/products',
	[AppRoutes.PRODUCT]: '/products/:productId',
	[AppRoutes.PROFILE]: '/profile',
	[AppRoutes.CART]: '/cart',
	[AppRoutes.SIGNUP]: '/signup',
	[AppRoutes.SIGNIN]: '/signin',
	[AppRoutes.NOT_FOUND]: '*',
};

const ProtectedFavoritesPage = WithProtection(FavoritesPage);
const ProtectedProductPage = WithProtection(ProductPage);
const ProtectedProfilePage = WithProtection(ProfilePage);
const ProtectedProductsPage = WithProtection(ProductsPage);

export const router = createBrowserRouter([
	{
		path: RoutePath.home,
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: RoutePath.favorites,
				element: <ProtectedFavoritesPage />,
			},
			{
				path: RoutePath.products,
				element: <ProtectedProductsPage />,
			},
			{
				path: RoutePath.product,
				element: <ProtectedProductPage />,
			},
			{
				path: RoutePath.profile,
				element: <ProtectedProfilePage />,
			},
			{
				path: RoutePath.cart,
				element: <CartPage />,
			},
			{
				path: RoutePath.signup,
				element: <SignUpPage />,
			},
			{
				path: RoutePath.signin,
				element: <SignInPage />,
			},
			{
				path: RoutePath.not_found,
				element: <NotFoundPage />,
			},
		],
	},
]);
