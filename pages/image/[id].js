import { useEffect, useState } from 'react';
import client from '@/utils/client';
import { urlFor, urlForThumbnail } from '@/utils/image';
import { Container, H2, P, Button } from '@/utils/sharedStyles';
import Layout from '@/components/Layout';
import styled from 'styled-components';
import NextLink from 'next/link';
import getStripe from '@/utils/getStripe';
import axios from 'axios';

const GridWrapper = styled.div`
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
`;

const Image = styled.img`
    width: 100%;
`;

const TEST_PRODUCT_PRICE_ID = "price_1MmenNCrOdBquP9Projo19TQ";

export default function ImageDetailPage({ id }) {
	const [asset, setAsset] = useState();
    const [bucket, setBucket] = useState();
    const [filename, setFilename] = useState();
    const [assetAvailable, setAssetAvailable] = useState(false);

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
                    setBucket(bucket);
                    const filename = asset.filename;
                    setFilename(filename);
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
        setAssetAvailable(data.available);
    }

    const redirectToCheckout = async () => {
        // Must have image bucket and filename to proceed
        if(!bucket || !filename) return;
    
        // Create Stripe checkout
        const {
            data: {id}
        } = await axios.post('/api/checkout_sessions', {
            items: [
                {
                    price: TEST_PRODUCT_PRICE_ID,
                    quantity: 1
                },
            ],
            imageBucket: bucket,
            imageFilename: filename
        });
    
        console.log("got checkout ID: ", id);
        // Redirect to checkout
        const stripe = await getStripe();
        await stripe.redirectToCheckout({sessionId: id});
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

                            {assetAvailable ? 
                                <Button onClick={redirectToCheckout}>Purchase Full-Resolution</Button>
                            : null}
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
