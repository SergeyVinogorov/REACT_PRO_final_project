import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { categories } from '../lib/categories';
import * as React from 'react';

export function Hero() {
	return (
		<Box sx={{ bgcolor: '#FFE44D' }}>
			<Container maxWidth='lg' sx={{ py: { xs: 5, md: 7 } }}>
				<Grid container spacing={6} alignItems='center'>
					<Grid item xs={12} md={6}>
						<Typography
							variant='h3'
							fontWeight={900}
							lineHeight={1.1}
							letterSpacing={-0.6}>
							Крафтовые
							<br />
							лакомства для
							<br />
							собак
						</Typography>

						<Typography
							sx={{ mt: 2 }}
							variant='body2'
							color='text.secondary'
							maxWidth={420}>
							Всегда свежие лакомства ручной работы с доставкой по России и Миру
						</Typography>

						<Button
							component={RouterLink}
							to='/products'
							variant='contained'
							sx={{
								mt: 3,
								bgcolor: '#fff',
								color: '#111827',
								borderRadius: 999,
								px: 3,
								py: 1.2,
								boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
								'&:hover': { bgcolor: '#f8fafc' },
							}}>
							Каталог&nbsp;›
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* Illustration / hero visual (no play button) */}
						<Box
							sx={{
								mx: 'auto',
								maxWidth: 560,
								borderRadius: 6,
								overflow: 'hidden',
								position: 'relative',
								aspectRatio: '16 / 9',
								bgcolor: 'rgba(255,255,255,0.25)',
								backdropFilter: 'blur(8px)',
							}}>
							<Box
								sx={{
									position: 'absolute',
									inset: 0,
									background:
										'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35), transparent 60%)',
								}}
							/>
							<Box
								sx={{
									position: 'absolute',
									inset: 0,
									display: 'grid',
									placeItems: 'center',
								}}>
								<Paper
									elevation={0}
									sx={{
										px: 4,
										py: 3,
										borderRadius: 5,
										bgcolor: 'rgba(255,255,255,0.35)',
										backdropFilter: 'blur(8px)',
									}}>
									<Stack alignItems='center' spacing={1}>
										<PetsOutlinedIcon sx={{ fontSize: 56, opacity: 0.75 }} />
										<Typography
											variant='caption'
											color='text.secondary'
											fontWeight={800}>
											Demo
										</Typography>
									</Stack>
								</Paper>
							</Box>
						</Box>
					</Grid>
					{/* Floating categories bar */}
					<Box
						sx={{
							mt: 3,
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						}}>
						<Paper
							elevation={3}
							sx={{
								width: '92%',
								borderRadius: 4,
								p: 1.25,
								bgcolor: 'rgba(255,255,255,0.92)',
								backdropFilter: 'blur(8px)',
							}}>
							<Grid container spacing={1}>
								{categories.map((c) => (
									<Grid key={c.label} item xs={4} md={2}>
										<Button
											fullWidth
											variant='text'
											sx={{
												borderRadius: 3,
												py: 1.4,
												color: 'text.secondary',
												textTransform: 'none',
												fontWeight: 700,
												gap: 1,
												'&:hover': { bgcolor: 'rgba(17,24,39,0.04)' },
											}}>
											{c.icon}
											<Typography variant='caption' fontWeight={700}>
												{c.label}
											</Typography>
										</Button>
									</Grid>
								))}
							</Grid>
						</Paper>
					</Box>
				</Grid>
			</Container>
		</Box>
	);
}
