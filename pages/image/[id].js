import { useEffect, useState } from 'react';
import client from '@/utils/client';
import { urlFor, urlForThumbnail } from '@/utils/image';
import { Container, H2, P } from '@/utils/sharedStyles';
import Layout from '@/components/Layout';
import styled from 'styled-components';
import NextLink from 'next/link';
import {BuyNowButton} from '@ecwid/nextjs-ecwid-plugin';

const GridWrapper = styled.div`
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
`;

const Image = styled.img`
    width: 100%;
`;

export default function ImageDetailPage({ id }) {
	const [asset, setAsset] = useState();

    useEffect(() => {
        console.log("here we are")
    }, []);

	useEffect(() => {
        const fetchAsset = async () => {
			try {
				client.fetch(
					`*[_type == "asset" && _id == $id]{
                        image,
                        filename,
                        collection->
                    }
                    [0]`,
					{ id }
				).then(asset => {
                    setAsset(asset);
                    const bucket = asset.collection.slug.current;
                    const filename = asset.filename;
                    getAssetAvailability(bucket, filename);
                });
                
			} catch (err) {
				console.log(err);
			}
		};
        fetchAsset();
	}, [id]);


    const getAssetAvailability = async (bucket, filename) => {
        const response = await fetch(`/api/checkFileAvailability?bucket=${bucket}&filename=${filename}`);
        const data = await response.json();
        console.log("availability response: ", data.available);
    }

	return (
		<Layout title={"Image Detail"}>
			<Container>
                {asset ? 
                    <GridWrapper>
                        <Image src={urlFor(asset.image)}/>
                        <div>
                            <H2>Purchase High Quality Photo</H2>
                            <P>Full resolution photos are available for instant download with purchase.<br/><br/>All photos are captured by Graham Bewley, a fellow cyclist and photographer. Happy trails! ✌</P>

                            <BuyNowButton
                                storeId="84349616"
                                productId="537476671"
                                isShowPrice={false}
                            />
                        </div>
                    </GridWrapper>
                : null}
                
            </Container>
		</Layout>
	);
}

export function getServerSideProps(context) {
	return {
		props: { id: context.params.id },
	};
}
