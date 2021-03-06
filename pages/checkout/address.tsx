import React from 'react'

import { NextPage } from 'next';

import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

const AddressPage: NextPage = () => {
    return (
        <ShopLayout title={'Direccion'} pageDescription={'Confirmar dirección de destino'} >
            
            <Typography variant='h1' component='h1'>
                Dirección
            </Typography>

            <Grid container spacing={2} mt={2}>

                <Grid item xs={12} sm={6}>
                    <TextField label='Nombre' fullWidth variant='filled' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Apellido' fullWidth variant='filled' />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección' fullWidth variant='filled' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección 2 (opcional)' fullWidth variant='filled' />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Codigo Postal' fullWidth variant='filled' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' fullWidth variant='filled' />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant='filled'
                            label='País'
                            value={1}
                        >
                            <MenuItem value={1}>Argentina</MenuItem>
                            <MenuItem value={2}>Uruguay</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Teléfono' fullWidth variant='filled' />
                </Grid>

            </Grid>

            <Box sx={{mt: 5, display:'flex', justifyContent: 'center'}}>
                <Button color='secondary' className='circular-btn' size='large'>
                    Revisar Pedido
                </Button>
            </Box>

        </ShopLayout>
    )
}

export default AddressPage