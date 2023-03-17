import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import CollectionsGrid from '@/components/CollectionsGrid';
import { Container } from '@/utils/sharedStyles';
import client from '@/utils/client';
import ShortBanner from '../components/ShortBanner';


export default function Collections() {
	const [collections, setCollections] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = `*[_type == "collection"] | order(date desc)`;
				client.fetch(query).then((collections) => {
					setCollections(collections);
				});
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	return (
		<Layout>
			<ShortBanner 
                title="Collections"
                subtitle="Discover photos organized by events or collections."
            />
			<Container>
				<CollectionsGrid collections={collections}/>
			</Container>
		</Layout>
	);
}
