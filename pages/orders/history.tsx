import React from 'react';

import NextLink from 'next/link';

import { Chip, Grid, Link, Typography } from '@mui/material';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts/ShopLayout';


const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 100
	},
	{
		field: 'fullname',
		headerName: 'Nombre completo',
		width: 300
	},
	{
		field: 'paid',
		headerName: 'Pagada',
		description: 'Si la orden está pagada o no',
		width: 200,
		renderCell: (params: GridValueGetterParams) => {
			return (
				params.row.paid
					? <Chip color={'success'} label={'Pagada'} variant='outlined'/>
					: <Chip color={'error'} label={'Pendiente de pago'} variant='outlined'/>
			)
		}
	},
	{
		field: 'orderpage',
		headerName: 'Ver Orden',
		width: 400,
		sortable: false,
		renderCell: (params: GridValueGetterParams) => {
			return (
			<NextLink href={`/orders/${params.row.id}`} passHref>
				<Link >Order 1234</Link>
			</NextLink>
			)
		}
	}
];

const rows = [
	{
		id: 1,
		fullname: 'Mirco Martin',
		paid: true,
		orderpage: true
	},
	{
		id: 2,
		fullname: 'Fulcha Sfulchini',
		paid: false,
		orderpage: true
	},
	{
		id: 3,
		fullname: 'Pancho Audisio',
		paid: true,
		orderpage: true
	}
]



const HistoryPage = () => {
	return (
		<ShopLayout
			title={'Historial de ordenes'}
			pageDescription={'Historial de ordenes del cliente'}
		>
			<Typography variant={'h1'} component={'h1'}>Historial de ordenes</Typography>
			
			<Grid container>
				<Grid item xs={12} sx={{height:'650px', width:'100%'}}>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Grid>
			</Grid>

		</ShopLayout>
	);
};

export default HistoryPage;
