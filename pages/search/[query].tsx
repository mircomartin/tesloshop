import { GetServerSideProps, NextPage } from 'next';

import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { ProductList } from '../../components/products';

interface Props {
	products: IProduct[];
	foundProducts: boolean;
	query: string;
}

const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {
	
	return (
		<ShopLayout
			title={'Teslo-Shop - Search'}
			pageDescription={'Encuentra los mejores productos!'}
		>
			<Typography variant="h1" component="h1" mb={3}>
				Buscar producto
			</Typography>

			{
				foundProducts
				?
				<Typography variant="h2" sx={{ mb: 3 }}>
					Reesultados para: <strong>"{query}"</strong>
				</Typography>
				:
				<Box display={'flex'}>
					<Typography variant="h2" sx={{ mb: 3 }}>
						No encontramos resultados para <span><strong>"{query}"</strong></span>
					</Typography>
				</Box>
			}
			
			<ProductList products={products} />
			
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {

	const {query = ''} = params as { query: string };

	if ( query.length === 0 ) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	let products = await dbProducts.getProductsByTerm(query);

	const foundProducts = products.length > 0;

	if(!foundProducts) {
		products = await dbProducts.getAllProducts();
	}

	return {
		props: {
			products,
			foundProducts,
			query,
		}
	}
}

export default SearchPage;
