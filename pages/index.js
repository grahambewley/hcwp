import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { Banner, BannerHeadline, Container } from '@/utils/sharedStyles';

export default function Home() {
	const router = useRouter();

	return (
		<Layout>
			<Banner>
				<Container>
					<BannerHeadline>Have Camera Will Pedal</BannerHeadline>
				</Container>
			</Banner>
		</Layout>
	);
}
