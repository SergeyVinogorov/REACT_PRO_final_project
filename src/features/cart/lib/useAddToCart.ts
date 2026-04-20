import { useAppDispatch } from 'shared/utils';
import { cartActions } from '../model/cart';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();

	const addProductToCart = (cartProduct: CartProduct) => {
		dispatch(cartActions.addCartProduct(cartProduct));
	};

	return { addProductToCart };
};
