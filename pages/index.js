import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import CollectionsGrid from '@/components/CollectionsGrid';
import { useRouter } from 'next/router';
import { Button, Container, H3 } from '@/utils/sharedStyles';
import client from '@/utils/client';
import styled from 'styled-components';
import { Carter_One, Inter_Tight } from '@next/font/google';

const carterOne = Carter_One({ weight: '400', subsets: ['latin'] });
const interTight = Inter_Tight({ weight: '200', subsets: ['latin'] });

const Banner = styled.div`
	height: 60vh;
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: 4rem;

	&::before {
		content: '';
		position: absolute;
		height: 100%;
		width: 100%;
		background-image: url('/default_bg.jpg');
		filter: sepia(80%);
		background-size: cover;
		background-position: center;
		opacity: 0.15;
		z-index: -1;
	}
`;

const BannerHeadline = styled.h1`
	font-size: 3.6rem;
	font-family: ${carterOne.style.fontFamily};
`;

const BannerSubhead = styled.h2`
	font-size: 1.4rem;
	font-family: ${interTight.style.fontFamily};
	margin-bottom: 2rem;
`;

export default function Home() {
	const router = useRouter();

	const [latestCollections, setLatestCollections] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = `*[_type == "collection"][0..2] | order(date desc)`;
				client.fetch(query).then((collections) => {
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
					<BannerHeadline>Have Camera, Will Pedal.</BannerHeadline>
					<BannerSubhead>Trail photography by Graham Bewley</BannerSubhead>
					<Button onClick={() => router.push('/collections')}>View All Collections</Button>
				</Container>
			</Banner>

			<Container>
				<H3>Latest Collections:</H3>
				<CollectionsGrid collections={latestCollections}/>
			</Container>
			
		</Layout>
	);
}
