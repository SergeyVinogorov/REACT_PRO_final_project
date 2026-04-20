import { useNavigate } from 'react-router-dom';
import { BackSvg } from 'shared/assets';
import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const ButtonBack = () => {
	const navigate = useNavigate();
	return (
		<Tooltip title='Назад'>
			<IconButton
				onClick={() => navigate(-1)}
				sx={{
					width: 44,
					height: 44,
					borderRadius: 2,
					bgcolor: '#fff',
					border: '1px solid rgba(15, 23, 42, 0.08)',
					boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
					'&:hover': { bgcolor: 'rgba(15, 23, 42, 0.03)' },
				}}
				aria-label='Back'>
				{/*<BackSvg />*/}
				<ArrowBackIosNewIcon fontSize='small' />
			</IconButton>
		</Tooltip>
	);
};
