import { RootState } from 'shared/types/storeTypes';

export const selectAccessToken = (s: RootState) => s.user.accessToken;
export const selectUser = (s: RootState) => s.user;
export const selectIsAuthenticated = (s: RootState) =>
	Boolean(s.user.accessToken);
