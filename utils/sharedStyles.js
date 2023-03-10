import styled from 'styled-components';
import { Orelega_One, Montserrat, Permanent_Marker } from '@next/font/google';

const montserrat = Montserrat({ weight: '400', subsets: ['latin'] });
const orelegaOne = Orelega_One({ weight: '400', subsets: ['latin'] });

const H1 = styled.h1`
	font-size: 2.4rem;
	font-family: ${orelegaOne.style.fontFamily};
`;
const H3 = styled.h3`
	font-size: 1.4rem;
	font-family: ${montserrat.style.fontFamily};
`;
const H4 = styled.h4`
	font-size: 1rem;
	font-family: ${montserrat.style.fontFamily};
`;

const Banner = styled.div`
	height: 100vh;
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
	font-size: 4rem;
	font-family: ${orelegaOne.style.fontFamily};
`;

const BannerSubhead = styled.h2`
	font-size: 2rem;
	font-family: ${montserrat.style.fontFamily};
`;

const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 32px;
`;

export { 
	H1, H3, H4,
	Banner, BannerHeadline, Container };
