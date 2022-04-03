import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
    | { message: string }
    | IProduct[]
    
export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {

        case 'GET':
            return searchProducts( req, res );

        default:
            return res.status(400).json({message: 'Metodo no existe'});
            
    }

}

const searchProducts = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
	
	await db.connect();

    let { q = '' } = req.query;

	if(q.length === 0) {
		return res.status(400).json({message: 'No se ha ingresado una busqueda'});
	}

	if(q.length === 0) {
		return res.status(400).json({message: 'No se ha ingresado una busqueda'});
	}

	q = q.toString().toLowerCase();

    const products = await Product.find( {$text:{$search:q}} ).select('title images price inStock -_id').lean();

	await db.disconnect();

    return res.status(200).json(products);

}
