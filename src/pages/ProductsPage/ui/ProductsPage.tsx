import { CardList } from 'widgets/CardList';
import { WithQuery } from 'shared/HOCs/WithQuery';
import { LoadMore, useProducts } from 'features/products';
import { ButtonBack } from 'shared/ui/ButtonBack';

const CardListWithQuery = WithQuery(CardList);

export const ProductsPage = () => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<main
			style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 16px 40px' }}>
			<div style={{ marginBottom: 10 }}>
				<ButtonBack />
			</div>
			<CardListWithQuery
				title='Каталог'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
				isSortEnabled={true}
			/>
			<div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
				<LoadMore />
			</div>
		</main>
	);
};
