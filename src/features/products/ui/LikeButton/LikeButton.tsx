import s from './LikeButton.module.css';
import classNames from 'classnames';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '../../api/productsApi';
import { toast } from 'react-toastify';
import { useAppSelector } from 'shared/utils';
import { LikeSvg } from 'shared/assets';
import { userSelectors } from 'features/auth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useOptimistic, useTransition } from 'react';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLikedFromServer = product?.likes.some((l) => l.userId === user?.id);

	const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic<
		boolean,
		boolean
	>(isLikedFromServer, (_current, next) => next);
	const [isPending, startTransition] = useTransition();

	const toggleLike = async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		const next = !optimisticIsLiked;
		startTransition(() => setOptimisticIsLiked(next));

		let response;
		if (next) {
			response = await setLike({ id: `${product.id}` });
		} else {
			response = await deleteLike({ id: `${product.id}` });
		}

		if (response.error) {
			startTransition(() => setOptimisticIsLiked(isLikedFromServer));
			const error = response.error as IErrorResponse;
			toast.error(error.data.message);
		}
	};

	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticIsLiked,
				[s['card__favorite_is-pending']]: isPending,
			})}
			onClick={toggleLike}
			type='button'
			aria-label={
				optimisticIsLiked ? 'Убрать из избранного' : 'Добавить в избранное'
			}>
			{/*<LikeSvg />*/}

			{/*<img src={LikeSvg} alt='' width={18} height={18} />*/}
			<FavoriteBorderIcon />
		</button>
	);
};
