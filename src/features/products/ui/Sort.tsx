import * as React from 'react';
import { Tabs, Tab, Paper } from '@mui/material';
import { useSort } from 'features/products/lib/useSort';

export const Sort = () => {
	const { sort, setSort, sortParams } = useSort();

	return (
		<Paper
			elevation={0}
			sx={{
				width: '100%',
				borderRadius: 3,
				px: 2,
				py: 1,
				boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
				border: '1px solid rgba(15, 23, 42, 0.06)',
				bgcolor: '#fff',
			}}>
			<Tabs
				value={sort}
				onChange={(_, v) => setSort(v)}
				variant='standard'
				scrollButtons='auto'
				allowScrollButtonsMobile
				sx={{
					minHeight: 32,
					width: '100%',
					'& .MuiTabs-flexContainer': {
						gap: 1,
					},
					'& .MuiTabs-indicator': {
						height: 2,
						borderRadius: 2,
					},
					'& .MuiTab-root': {
						minHeight: 32,
						px: 1.2,
						py: 0.5,
						textTransform: 'none',
						fontSize: 13,
						fontWeight: 700,
						minWidth: 'auto',
						color: 'rgba(15, 23, 42, 0.65)',
					},
					'& .MuiTab-root.Mui-selected': {
						color: '#0f172a',
					},
				}}>
				{sortParams.map((p) => (
					<Tab key={p.value} value={p.value} label={p.title} />
				))}
			</Tabs>
		</Paper>
	);
};
