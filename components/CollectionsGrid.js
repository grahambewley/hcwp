import React from 'react'
import styled from 'styled-components';
import { urlForThumbnail } from '@/utils/image';
import NextLink from 'next/link';
import { H4 } from '@/utils/sharedStyles';

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
`;

const GridItem = styled.div`
    
`;


const CollectionImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

export default function CollectionsGrid({collections}) {

    return (
        <GridWrapper>
            {collections.map(coll => (
                
                <GridItem key={coll._id}>
			        <NextLink href={`/collection/${coll.slug.current}`} passHref>
                        <CollectionImage src={urlForThumbnail(coll.image)}/>
                        <H4>{coll.name}</H4>
                    </NextLink>
                </GridItem>
            ))}
        </GridWrapper>
    )

}