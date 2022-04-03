import { ISize } from './';

export interface ICartProduct {
    _id: string;
	quantity: number;
    gender: 'men'|'women'|'kid'|'unisex';
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
}
