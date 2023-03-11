import { useEffect, useState } from 'react';
import client from '@/utils/client';
import { urlFor, urlForThumbnail } from '@/utils/image';
import { Container, H1, H3, P, Button } from '@/utils/sharedStyles';
import Layout from '@/components/Layout';
import styled from 'styled-components';
import NextLink from 'next/link';

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
        const fetchAsset = async () => {
			try {
				client.fetch(
					`*[_type == "asset" && _id == $id][0]`,
					{ id }
				).then(asset => {
                    setAsset(asset);
				    console.log("asset: ", asset);
                    // TODO: 
                    // Here I thought I'd be able to get the original filename and use that
                    // but it seems that's not working.
                    // Need to add a new field to the Asset schema (name) and have this match 
                    // the filename in S3.
                    // Eventually this will be automated with the JSON upload thing.
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
                <GridWrapper>
                    <Image src={urlFor(asset?.image)}/>
                </GridWrapper>
            </Container>
		</Layout>
	);
}

export function getServerSideProps(context) {
	return {
		props: { id: context.params.id },
	};
}
