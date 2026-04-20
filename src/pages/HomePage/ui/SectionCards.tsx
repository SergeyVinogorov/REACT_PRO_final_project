import {
	Box,
	Container,
	Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Card } from '../types';

export function SectionCards({
	title,
	cards,
}: {
	title: string;
	cards: Card[];
}) {
	return (
		<Container maxWidth='lg' sx={{ pb: 5 }}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<Typography variant='h6' fontWeight={900}>
					{title}
				</Typography>

				<Stack direction='row' spacing={1}>
					<IconButton sx={{ bgcolor: 'rgba(15,23,42,0.06)' }}>
						<ChevronLeftIcon />
					</IconButton>
					<IconButton sx={{ bgcolor: 'rgba(15,23,42,0.06)' }}>
						<ChevronRightIcon />
					</IconButton>
				</Stack>
			</Stack>

			<Grid container spacing={2} sx={{ mt: 1.5 }}>
				{cards.map((c) => (
					<Grid key={c.title} item xs={12} md={6}>
						<Paper
							elevation={0}
							sx={{
								borderRadius: 6,
								overflow: 'hidden',
								bgcolor: c.color,
							}}>
							<Grid container spacing={0} sx={{ p: 3 }} alignItems='stretch'>
								<Grid item xs={12} sm={6}>
									<Typography color='#fff' fontWeight={900} variant='h6'>
										{c.title}
									</Typography>
									{c.subtitle ? (
										<Typography
											sx={{ mt: 1, whiteSpace: 'pre-line' }}
											variant='body2'
											color='rgba(255,255,255,0.9)'
											fontWeight={600}>
											{c.subtitle}
										</Typography>
									) : null}
								</Grid>

								<Grid item xs={12} sm={6} sx={{ mt: { xs: 2, sm: 0 } }}>
									<Box
										component='img'
										src={c.imageUrl}
										alt={c.title}
										sx={{
											width: '100%',
											height: 170,
											objectFit: 'cover',
											borderRadius: 4,
										}}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
