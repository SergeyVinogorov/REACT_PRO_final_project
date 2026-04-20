import { useSelector } from 'react-redux';
import {
	selectAccessToken,
	selectIsAuthenticated,
	selectUser,
} from '../model/selectors';

export function useAuth() {
	const accessToken = useSelector(selectAccessToken);
	const user = useSelector(selectUser);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	return { isAuthenticated, accessToken, user };
}
