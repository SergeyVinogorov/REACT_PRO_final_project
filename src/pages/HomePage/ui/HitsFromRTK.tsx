import {
	Box,
	Container,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ProductCard } from './ProductCard';
import * as React from 'react';
import { useProducts } from '../../../features/products';

export function HitsFromRTK() {
	const { products, isLoading } = useProducts();
	return (
		<Container maxWidth='lg' sx={{ pb: 6 }}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<Typography variant='h6' fontWeight={900}>
					Хиты
				</Typography>
				<Stack direction='row' spacing={1}>
					<IconButton sx={{ bgcolor: 'rgba(17,24,39,0.06)' }} aria-label='prev'>
						<ChevronLeftIcon />
					</IconButton>
					<IconButton sx={{ bgcolor: 'rgba(17,24,39,0.06)' }} aria-label='next'>
						<ChevronRightIcon />
					</IconButton>
				</Stack>
			</Stack>

			<Box sx={{ mt: 2 }}>
				{isLoading ? (
					<Typography variant='body2' color='text.secondary'>
						Loading products…
					</Typography>
				) : (
					<Grid container spacing={2}>
						{products.map((p) => (
							<Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
								<ProductCard product={p} />
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</Container>
	);
}
