import { NextPage } from 'next';

import NextLink from 'next/link';

import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Link,
	Typography,
} from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart/';

const SummaryPage: NextPage = () => {
	return (
		<ShopLayout title="Resumen de la orden" pageDescription="Resumen de la orden">
			<Typography variant="h1" color="textPrimary" component="h1">
				Resumen de la orden
			</Typography>

			<Grid container mt={4}>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>

				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2" component="h2">
								Resumen (3 productos)
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">
									Dirección de entrega
								</Typography>

								<NextLink href="/checkout/address" passHref>
									<Link underline="always">Editar</Link>
								</NextLink>
							</Box>

							<Typography>Mirco Martin</Typography>
							<Typography>Nervo 1779</Typography>
							<Typography>Rosario, Santa Fe</Typography>
							<Typography>Argentina</Typography>
							<Typography>+ 51 3412292496</Typography>

							<Divider sx={{ my: 1 }} />

							<Box display="flex" justifyContent="end">
								<NextLink href="/cart" passHref>
									<Link underline="always">Editar</Link>
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<Button
									color="secondary"
									className="circular-btn"
									fullWidth
								>
									Confirmar orden
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
