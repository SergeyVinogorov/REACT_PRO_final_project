import { memo, useMemo } from 'react';
import s from './CardList.module.css';
import { Card } from './Card/Card';
import { Sort } from 'features/products';

type CardListProps = {
	title: string;
	products: Product[];
	isSortEnabled?: boolean;
};

const CardListComponent = ({
	title,
	products,
	isSortEnabled = false,
}: CardListProps) => {
	const cards = useMemo(
		() =>
			products.map((product) => <Card key={product.id} product={product} />),
		[products]
	);

	if (!products.length) {
		return (
			<div className={s.empty}>
				<h1 className={s.emptyTitle}>Товар не найден</h1>
			</div>
		);
	}

	return (
		<div className={s.cardList}>
			<div className={s.header}>
				<h1 className={s.title}>{title}</h1>
			</div>

			{isSortEnabled && (
				<div className={s.sortRow}>
					<Sort />
				</div>
			)}

			<div className={s.grid}>{cards}</div>
		</div>
	);
};

export const CardList = memo(CardListComponent);
