import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';

export const PromoBanner = () => {
	return (
		<Container maxWidth='lg' sx={{ py: 5 }}>
			<Paper
				elevation={0}
				sx={{ borderRadius: 6, overflow: 'hidden', bgcolor: '#F59E0B' }}>
				<Grid container alignItems='center'>
					<Grid item xs={12} md={6} sx={{ p: { xs: 3, md: 4 } }}>
						<Typography
							variant='h4'
							fontWeight={900}
							color='#fff'
							lineHeight={1.1}>
							Подарок за
							<br />
							первый заказ!
						</Typography>
						<Typography
							sx={{ mt: 1.5 }}
							variant='body2'
							color='rgba(255,255,255,0.9)'>
							Лёгкое говяжье — пластины
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						sx={{ p: { xs: 3, md: 4 }, pt: { xs: 0, md: 4 } }}>
						<Box
							component='img'
							src='https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=60'
							alt='Promo'
							sx={{
								width: '100%',
								height: { xs: 160, md: 180 },
								objectFit: 'cover',
								borderRadius: 4,
							}}
						/>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};
