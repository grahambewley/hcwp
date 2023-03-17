import styled from 'styled-components';
import { Orelega_One, Montserrat, Permanent_Marker, Inter } from '@next/font/google';

const montserrat = Montserrat({ weight: '400', subsets: ['latin'] });
const orelegaOne = Orelega_One({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: '400', subsets: ['latin'] });

const H1 = styled.h1`
	font-size: 2.4rem;
	font-family: ${orelegaOne.style.fontFamily};
`;
const H2 = styled.h2`
	font-size: 2rem;
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
const P = styled.p`
	font-family: ${inter.style.fontFamily};
`;

const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 32px;
`;

const Button = styled.button`
	display: inline-block;
	border: 2px solid black;
	padding: 1rem 2rem;
	margin: 0;
	text-decoration: none;
	background: none;
	font-family: ${montserrat.style.fontFamily};
	font-size: 1rem;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, 
				transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;

	&:hover {
		border: 2px solid grey;
	}
`;

export { 
	H1, 
	H2,
	H3, 
	H4,
	P,
	Container,
	Button
};
