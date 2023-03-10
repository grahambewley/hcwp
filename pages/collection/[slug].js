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
	const [collection, setCollection] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchCollection = async () => {
			try {
				const collection = await client.fetch(
					`*[_type == "collection" && slug.current == $slug][0]`,
					{ slug }
				);
                setCollection(collection);
				console.log("collection: ", collection);
			} catch (err) {
				console.log(err);
			}
		};
		fetchCollection();
	}, [slug]);

	return (
		<Layout title={collection?.name}>
			<div>Hello world</div>
		</Layout>
	);
}

export function getServerSideProps(context) {
	return {
		props: { slug: context.params.slug },
	};
}
