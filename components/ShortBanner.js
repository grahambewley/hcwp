import React from 'react';
import { Container } from '@/utils/sharedStyles';
import styled from 'styled-components';
import { Carter_One, Inter_Tight } from '@next/font/google';

const carterOne = Carter_One({ weight: '400', subsets: ['latin'] });
const interTight = Inter_Tight({ weight: '200', subsets: ['latin'] });

const Banner = styled.div`
	padding: 8rem 0;
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

export default function ShortBanner({title}) {

    return (
        <Banner>
            <Container>
                <BannerHeadline>{title}</BannerHeadline>
                {/* <BannerSubhead>Trail photography by Graham Bewley</BannerSubhead> */}
            </Container>
        </Banner>
    )
}