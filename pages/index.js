import React, { useContext, useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import { Alert, CircularProgress, Grid } from '@mui/material';
import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import client from '@/utils/client';
import { Store } from '@/utils/store';
import axios from 'axios';
import { urlForThumbnail } from '@/utils/image';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export default function Home() {
	const {
		state: { cart },
		dispatch,
	} = useContext(Store);

	const router = useRouter();

	const { enqueueSnackbar } = useSnackbar();

	const [products, setProducts] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = `*[_type == "product"]`;
				client.fetch(query).then((products) => {
					setProducts(products);
				});
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	const addToCartHandler = async (product) => {
		const existItem = cart.cartItems.find((x) => x._id === product._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);
		if (data.countInStock < quantity) {
			enqueueSnackbar('Sorry. Product is out of stock', {
				variant: 'error',
			});
			return;
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: {
				_key: product._id,
				name: product.name,
				countInStock: product.countInStock,
				slug: product.slug.current,
				price: product.price,
				image: urlForThumbnail(product.image),
				quantity,
			},
		});
		enqueueSnackbar(`${product.name} added to cart`, {
			variant: 'success',
		});
		router.push('/cart');
	};

	return (
		<Layout>
			{loading ? (
				<CircularProgress />
			) : error ? (
				<Alert>{error}</Alert>
			) : (
				<Grid container spacing={3}>
					{products.map((product) => (
						<Grid item md={4} key={product.slug.current}>
							<ProductItem
								product={product}
								addToCartHandler={addToCartHandler}
							></ProductItem>
						</Grid>
					))}
				</Grid>
			)}
		</Layout>
	);
}
