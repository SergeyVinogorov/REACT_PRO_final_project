import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';

export function ProductCard({ product }: { product: Product }) {
	return (
		<Card
			elevation={0}
			sx={{ borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)' }}>
			<CardActionArea component={RouterLink} to={`/products/${product.id}`}>
				<CardMedia
					component='img'
					height='200'
					image={product.images}
					alt={product.name}
					sx={{ objectFit: 'cover' }}
				/>
				<CardContent>
					<Typography variant='subtitle2' fontWeight={900}>
						{product.price} ₽
					</Typography>
					<Typography variant='body2' sx={{ mt: 0.5 }}>
						{product.name}
					</Typography>
					<Typography variant='caption' color='text.secondary'>
						{product.category?.name ?? 'Категория'}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
