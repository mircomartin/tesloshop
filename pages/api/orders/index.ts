import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data = 
	| {message: string}
	| IOrder;

export default function handle (req: NextApiRequest, res: NextApiResponse<Data>) {

	switch (req.method) {
		case 'POST':
			return createOrder(req, res);	
		default:
			res.status(200).json({ message: 'Example' });
	}

	
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	const {orderItems, total} = req.body as IOrder;

	//Verificar que tengamos usuario
	const session: any = await getSession({req})
	if(!session){
		return res.status(401).json({message: 'Debe estar autenticado para hacer esto'});
	}

	//Crear arreglo con los productos de la persona
	const productsIds = orderItems.map( p => p._id);
	await db.connect();

	const dbProducts = await Product.find({_id: {$in: productsIds}});

	try {
		
		const subTotal = orderItems.reduce((prev, current) => {

			const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price

			if(!currentPrice){
				throw new Error('Verifique el carrito de nuevo, producto no existe')
			}

			return (currentPrice * current.quantity) + prev

		}, 0)

		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
		const backendTotal = subTotal * ( taxRate + 1 );

		if(total !== backendTotal){
			throw new Error('El total no cuadra con el monto');
		}

		const userId = session.user._id;
		const newOrder = new Order({...req.body, isPaid: false, user: userId});
		newOrder.total = Math.round( newOrder.total * 100 ) / 100;

		await newOrder.save();
		await db.disconnect();
		
		return res.status(201).json(newOrder);

	} catch (error:any) {
		await db.disconnect();
		console.log(error);
		res.status(400).json({
			message: error.message || 'Revise logs del servidor'
		})
	}
	
	return res.status(201).json(req.body);

}
