import { Star } from 'shared/assets';

type TRating = {
	rating?: number;
	isEdit?: boolean;
	onChange?: (rating: number) => void;
};
export const Rating = ({ rating = 0, isEdit = false, onChange }: TRating) => {
	return (
		<div>
			{[...Array(5)].map((_e, i) => (
				<span key={i} style={{ cursor: isEdit ? 'pointer' : 'default' }}>
					{/*<Star*/}
					{/*	onClick={() => onChange?.(i)}*/}
					{/*	fill={i <= rating ? 'gold' : 'gray'}*/}
					{/*/>*/}
					<img
						src={Star}
						alt=''
						width={18}
						height={18}
						onClick={() => onChange?.(i)}
					/>
				</span>
			))}
		</div>
	);
};
