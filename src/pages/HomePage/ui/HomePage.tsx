import { Box } from '@mui/material';
import * as React from 'react';
import { Hero } from './Hero';
import { PromoBanner } from './PromoBanner';
import { SectionCards } from './SectionCards';
import { HitsFromRTK } from './HitsFromRTK';
import { hits, seen } from '../config/banersData';
import { useAuth } from 'features/auth';

export const HomePage = () => {
	const { isAuthenticated } = useAuth();
	return (
		<Box>
			<Hero />
			{!isAuthenticated ? (
				<Box pt={3}>
					<PromoBanner />
					<SectionCards title='Хиты' cards={hits} />
					<SectionCards title='Вы смотрели' cards={seen} />
				</Box>
			) : (
				<Box pt={3}>
					<HitsFromRTK />
					<SectionCards title='Вы смотрели' cards={seen} />
				</Box>
			)}
		</Box>
	);
};
