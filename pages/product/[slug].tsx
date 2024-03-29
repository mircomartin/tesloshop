import { useState } from 'react';

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { Button, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { dbProducts } from '../../database';

interface Props {
	product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

	const [currentQuantity, setCurrentQuantity] = useState<number>(1)

	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		quantity: currentQuantity,
		gender: product.gender,
		image: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
	});

	const onSelectedSize = (size: ISize) => {
		setTempCartProduct({
			...tempCartProduct,
			size,
		})
	};

	const onAddProduct = () => {
		console.log({tempCartProduct})
	}

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={7}>
					<ProductSlideshow images={product.images} />
				</Grid>

				<Grid item xs={12} sm={5}>
					{/* Titles */}
					<Box display="flex" flexDirection="column">
						<Typography variant="h1" component="h1">
							{product.title}
						</Typography>
						<Typography
							variant="subtitle1"
							component="h2"
						>{`$${product.price}`}</Typography>

						{/* Cantidad */}
						<Box sx={{ my: 2 }}>
							<Typography variant="subtitle2">Cantidad</Typography>
							<ItemCounter  currentValue={currentQuantity} updatedQuantity={setCurrentQuantity} maxValue={product.inStock}/>
							<SizeSelector
								sizes={product.sizes}
								selectedSize={tempCartProduct.size}
								onSelectedSize={onSelectedSize}
							/>
						</Box>

						{/* Agregar al carrito */}

						{product.inStock === 0 ? (
							<Chip label="Sin Stock" color="error" variant="outlined" />
						) : (
							<Button color="secondary" className="circular-btn" onClick={onAddProduct}>
								{tempCartProduct.size
									? 'Agregar al carrito'
									: 'Seleccione un talle'}
							</Button>
						)}

						{/* Descripcion */}

						<Box sx={{ mt: 3 }}>
							<Typography variant="subtitle2">Descripción:</Typography>
							<Typography variant="body1">{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//No se usa server sideprops!
/* export const getServerSideProps: GetServerSideProps = async ({params}) => {

	const { slug = '' } = params as { slug: string };
	const product = await getProductBySlug(slug);

	if ( !product ){
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			product
		}
	}
} */
//No se usa server sideprops!

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const productSlugs = await dbProducts.getAllProductsSlug();

	return {
		paths: productSlugs.map(({ slug }) => ({
			params: { slug },
		})),
		fallback: 'blocking',
	};
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = '' } = params as { slug: string };

	const product = await dbProducts.getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {
			product,
		},
		revalidate: 60 * 60 * 24,
	};
};

export default ProductPage;
