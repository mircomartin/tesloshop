import React, { FC } from 'react'

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { IconButton, Typography, Box } from '@mui/material'

interface Props {
    currentValue: number;
    maxValue: number;

    //Methods
    updatedQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({currentValue, maxValue, updatedQuantity}) => {

    if(currentValue >= maxValue) {
        currentValue = maxValue;
    }

    return (

        <Box display={'flex'} alignItems={'center'} >
            <IconButton onClick={() => updatedQuantity( currentValue - 1)}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: '40px', textAlign: 'center' }}>{currentValue}</Typography>
            <IconButton onClick={() => updatedQuantity( currentValue + 1)}>
                <AddCircleOutline />
            </IconButton>
        </Box>

    )
}
