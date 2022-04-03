import { Box, CircularProgress, Typography } from '@mui/material';

export const FullScreenLoading = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			height="calc(100vh - 200px)"
		>
			<Typography mb={3} variant='h2' fontWeight={600} fontSize='32px'>
				Cargando...
			</Typography>
			<CircularProgress thickness={3}/>
		</Box>
	);
};
