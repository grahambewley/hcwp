import { useContext, useEffect, useState } from 'react';
import client from '@/utils/client';
import { urlFor, urlForThumbnail } from '@/utils/image';
import { Container, H1, H3, P, Button } from '@/utils/sharedStyles';
import Layout from '@/components/Layout';
import styled from 'styled-components';

const WhiteSection = styled.div`
    background-color: white;
    padding: 2rem 0;
    margin-top: 4rem;
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
				console.log("collection: ", collection);
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
                console.log("assets: ", assets);
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
                        <AssetImage src={urlForThumbnail(asset.image)} />
                    </AssetGridItem>
                ))}
            </AssetGrid>
        )
    }

    const getAssetAvailability = async () => {
        const response = await fetch("/api/checkFileAvailability?bucket=2022-10-marquette-fall-enduro&filename=1-DSC_0230.jpg");
        const data = await response.json();
        console.log("availability response: ", data.available);
    }

	return (
		<Layout title={collection?.name}>
			<Container>
                <H1>{collection?.name}</H1>
                <P>{collection?.description}</P>

                <Button onClick={getAssetAvailability}>Do Thing</Button>
            </Container>
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