import { Box, Divider, Grid, Typography } from '@mui/material'

export const OrderSummary = () => {
    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>Sin Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 Productos</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Sub Total:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$155.36</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$25.36</Typography>
            </Grid>

            <Grid container item sx={{ mt: 3 }}>
                
                <Box sx={{ width: '100%', display: 'block' }}>
                    <Divider/>
                </Box>

                <Grid item xs={6}>
                    <Typography variant='subtitle1'>Total:</Typography>
                </Grid>
                <Grid item xs={6} display='flex' justifyContent='end'>
                    <Typography variant='subtitle1'>$180</Typography>
                </Grid>
            </Grid>

        </Grid>

    )
}