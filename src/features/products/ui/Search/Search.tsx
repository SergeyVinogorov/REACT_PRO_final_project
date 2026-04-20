import s from './Search.module.css';
import { useProductsSearchForm } from '../../lib/useProductsSearchForm';

export const Search = () => {
	const { searchValue, setSearchValue } = useProductsSearchForm();

	return (
		<form
			className={s.search}
			role='search'
			onSubmit={(e) => e.preventDefault()}>
			<span className={s.search__icon} aria-hidden>
				<svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
					<path
						d='M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z'
						stroke='currentColor'
						strokeWidth='2'
					/>
					<path
						d='M16.5 16.5 21 21'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			</span>

			<input
				type='text'
				className={s.search__input}
				placeholder='Поиск'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>

			{searchValue.length > 0 && (
				<button
					type='button'
					className={s.search__clear}
					onClick={() => setSearchValue('')}
					aria-label='Clear search'>
					<svg width='18' height='18' viewBox='0 0 24 24'>
						<circle cx='12' cy='12' r='10' fill='currentColor' opacity='0.2' />
						<path
							d='M8 8l8 8M16 8l-8 8'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</button>
			)}
		</form>
	);
};
