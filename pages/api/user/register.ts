import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import bcryptjs from 'bcryptjs';
import { jwt, validations } from '../../../utils';

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
            return registerUser( req, res );

        default:
            return res.status(400).json({message: 'Endpoint no existe'});
            
    }

}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	
	const { email = '', password = '', name = '' } = req.body;

	if (password.length < 6) {
		return res.status(400).json({message: 'La contraseña debe tener al menos 6 caracteres'});
	}

	if(name.length < 3){
		return res.status(400).json({message: 'El nombre debe tener al menos 3 caracteres'});
	}

	if (!validations.isValidEmail(email) ) {
		return res.status(400).json({message: 'El email no es válido'});
	}

	await db.connect();
	const user = await User.findOne({ email });

	if (user) {
		return res.status(400).json({message: 'El correo ya esta registrado'});
	}

	const newUser = new User({
		email: email.toLowerCase(),
		password: bcryptjs.hashSync(password),
		role: 'client',
		name: name,
	});

	try {
		await newUser.save({validateBeforeSave: true});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Revisar logs servidor',
		})
	}

	const { _id } = newUser;

	const token = jwt.signToken(_id, email);

	return res.status(200).json({
		token,
		user: {
			email, 
			role: 'client', 
			name
		}
	})

}
