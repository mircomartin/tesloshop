import { FC, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
};

export const CartProvider: FC<CartState> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	return (
		<CartContext.Provider
			value={{
				...state,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
