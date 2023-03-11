import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import bcryptjs from 'bcryptjs';
import { jwt } from '../../../utils';

type Data = 
	| { message: string }
	| {
		token: string;
		user: {
			email: string;
			role: string;
			name: string;
		}
	}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

	switch ( req.method ) {

        case 'POST':
            return loginUser( req, res );

        default:
            return res.status(400).json({message: 'Endpoint no existe'});
            
    }

}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	
	const { email = '', password = '' } = req.body;

	await db.connect();
	const user = await User.findOne({ email });
	await db.disconnect();

	if(!user){
		return res.status(400).json({message: 'Correo o contraseña no validos - EMAIl'});
	}

	if(!bcryptjs.compareSync(password, user.password!)){
		return res.status(400).json({message: 'Correo o contraseña no validos - CONTRASEÑA'});
	}

	const { role, name, _id } = user;

	const token = jwt.signToken(_id, email);

	return res.status(200).json({
		token,
		user: {
			email, role, name
		}
	})

}
