import { WithQuery } from 'shared/HOCs/WithQuery';
import { CardList } from 'widgets/CardList';
import { useProducts } from 'features/products';
import { ButtonBack } from 'shared/ui/ButtonBack';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = () => {
	const { isLoading, isError, products, error } = useProducts();

	return (
		<div className='container page'>
			<div className='pageTop'>
				<ButtonBack />
			</div>
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</div>
	);
};
