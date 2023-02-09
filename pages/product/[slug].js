import { useContext, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import client from '../../utils/client';
import classes from '../../utils/classes';
import { urlFor, urlForThumbnail } from '@/utils/image';
import Layout from '@/components/Layout';
import {
	Alert,
	Button,
	Card,
	CircularProgress,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import Image from 'next/image';
import { Store } from '@/utils/store';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductScreen({ slug }) {
	const router = useRouter();
	const {
		state: { cart },
		dispatch,
	} = useContext(Store);

	const { enqueueSnackbar } = useSnackbar();

	const [product, setProduct] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = `*[_type == "product" && slug.current == $slug][0]`;
				const product = await client.fetch(
					`*[_type == "product" && slug.current == $slug][0]`,
					{ slug }
				);
				setProduct(product);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};
		fetchData();
	}, [slug]);

	const addToCartHandler = async () => {
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
		<Layout title={product?.title}>
			{loading ? (
				<CircularProgress />
			) : error ? (
				<Alert>{error}</Alert>
			) : (
				<Box>
					<Box sx={classes.section}>
						<NextLink href={'/'} passHref>
							<Link>
								<Typography>Back to results</Typography>
							</Link>
						</NextLink>
					</Box>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6}>
							<Image
								src={urlFor(product.image)}
								alt={product.name}
								width={640}
								height={640}
							/>
						</Grid>
						<Grid item md={3} xs={12}>
							<Card>
								<List>
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												<Typography>Price</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography>
													${product.price}
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												<Typography>Status</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography>
													{product.countInStock > 0
														? 'In stock'
														: 'Unavailable'}
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem>
										<Button
											onClick={addToCartHandler}
											fullWidth
											variant="contained"
										>
											Add to cart
										</Button>
									</ListItem>
								</List>
							</Card>
						</Grid>
					</Grid>
				</Box>
			)}
		</Layout>
	);
}

export function getServerSideProps(context) {
	return {
		props: { slug: context.params.slug },
	};
}
