import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
    | { message: string }
    | IProduct
    
export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {

        case 'GET':
            return getProductBySlug( req, res );

        default:
            return res.status(400).json({message: 'Metodo no existe'});
            
    }

}

const getProductBySlug = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
	
	await db.connect();

    const { slug } = req.query;

    const productBySlug = await Product.findOne( {slug} ).lean();

    if(!productBySlug) {
        await db.disconnect();
        return res.status(404).json({message: 'Producto no encontrado' + slug});
    }

	await db.disconnect();

    return res.status(200).json(productBySlug);

}
