import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import CollectionsGrid from '@/components/CollectionsGrid';
import { useRouter } from 'next/router';
import { Banner, BannerHeadline, Container, H3 } from '@/utils/sharedStyles';
import client from '@/utils/client';
import { Typography } from '@mui/material';

export default function Home() {
	const router = useRouter();

	const [latestCollections, setLatestCollections] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = `*[_type == "collection"]`;
				client.fetch(query).then((collections) => {
					console.log("collections: ", collections);
					setLatestCollections(collections);
				});
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	return (
		<Layout>
			<Banner>
				<Container>
					<BannerHeadline>Have Camera Will Pedal</BannerHeadline>
				</Container>
			</Banner>

			<Container>
				<H3>Latest Collections:</H3>
				<CollectionsGrid collections={latestCollections}/>
			</Container>
			
		</Layout>
	);
}
