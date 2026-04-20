import { combineReducers } from 'redux';
import { cartSlice } from 'features/cart';
import { authApi, userSlice } from 'features/auth';
import { productsApi, productsSlice } from 'features/products';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});
