import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts';

const EmptyPage = () => {
	return (
		<ShopLayout title="Carrito Vacío" pageDescription='No hay artículos en el carrito de compra'>
			<Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>

				<RemoveShoppingCartOutlined sx={{fontSize: 100}} />

				<Box display='flex' flexDirection='column' alignItems='center' marginLeft='20px'>

					<Typography variant='h1' color='textPrimary'>
						Carrito Vacío
					</Typography>

					<NextLink href='/' passHref>
						<Link typography='h4' color='secondary'>
							Regresar
						</Link>
					</NextLink>

				</Box>
			</Box>
		</ShopLayout>
	)
}

export default EmptyPage;