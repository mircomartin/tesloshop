import React, { FC, useState } from 'react'

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { IconButton, Typography, Box } from '@mui/material'

interface Props {
    quantity: number;
    onChangeQuantity: (quantity: number) => void
}

export const ItemCounter: FC<Props> = ({quantity, onChangeQuantity}) => {


    const [changeQuantity, setChangeQuantity] = useState<number>(quantity)
    console.log(changeQuantity)

    return (

        <Box display={'flex'} alignItems={'center'} >
            <IconButton onClick={() => setChangeQuantity( changeQuantity - 1)}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: '40px', textAlign: 'center' }}>{quantity}</Typography>
            <IconButton onClick={() => setChangeQuantity( changeQuantity + 1)}>
                <AddCircleOutline />
            </IconButton>
        </Box>

    )
}
