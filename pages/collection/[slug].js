import { useContext, useEffect, useState } from 'react';
import client from '@/utils/client';
import { urlFor, urlForThumbnail } from '@/utils/image';
import { Container, H1, H3, P, Button } from '@/utils/sharedStyles';
import Layout from '@/components/Layout';
import styled from 'styled-components';
import NextLink from 'next/link';
import ShortBanner from '../../components/ShortBanner';

const WhiteSection = styled.div`
    background-color: white;
    padding: 2rem 0;
`;

const AssetGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
`;

const AssetGridItem = styled.div`
    aspect-ratio: 1;
`;

const AssetImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function ProductScreen({ slug }) {
	const [collection, setCollection] = useState();
	const [assets, setAssets] = useState();

	useEffect(() => {
		const fetchCollection = async () => {
			try {
				const collection = await client.fetch(
					`*[_type == "collection" && slug.current == $slug][0]`,
					{ slug }
				);
                setCollection(collection);
			} catch (err) {
				console.log(err);
			}
		};

        const fetchAssets = async () => {
            try {
                const assets = await client.fetch(
                    `*[_type == "asset" && collection->slug.current == $slug]`,
                    { slug }
                )
                setAssets(assets);
            } catch(err) {
                console.log(err);
            }
        }
		fetchCollection();
        fetchAssets();
	}, [slug]);

    const renderAssetGrid = () => {
        return (
            <AssetGrid>
                {assets?.map(asset => (
                    <AssetGridItem key={asset._id}>
                        <NextLink href={`/image/${asset._id}`} passHref>
                            <AssetImage src={urlForThumbnail(asset.image)} />
                        </NextLink>
                    </AssetGridItem>
                ))}
            </AssetGrid>
        )
    }

	return (
		<Layout title={collection?.name}>
			<ShortBanner title={collection?.name} subtitle={collection?.description}/>
            <WhiteSection>
                <Container>
                    {renderAssetGrid()}
                </Container>
            </WhiteSection>
		</Layout>
	);
}

export function getServerSideProps(context) {
	return {
		props: { slug: context.params.slug },
	};
}
