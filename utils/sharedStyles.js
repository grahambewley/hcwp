import styled from 'styled-components';
import { Carter_One, Inter_Tight, Inter } from '@next/font/google';

const carterOne = Carter_One({ weight: '400', subsets: ['latin'] });
const interTight = Inter_Tight({ weight: '300', subsets: ['latin'] });
const inter = Inter({ weight: ['400', '600'], subsets: ['latin'] });

const H1 = styled.h1`
	font-size: 2.4rem;
	font-family: ${carterOne.style.fontFamily};
`;
const H2 = styled.h2`
	font-size: 2rem;
	font-family: ${carterOne.style.fontFamily};
`;
const H3 = styled.h3`
	font-size: 1.4rem;
	font-family: ${interTight.style.fontFamily};
	margin-bottom: 1rem;
`;
const H4 = styled.h4`
	font-size: 1rem;
	font-family: ${interTight.style.fontFamily};
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
	font-family: ${inter.style.fontFamily};
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	text-align: center;
	transition: all .1s ease-out;
	-webkit-appearance: none;
	-moz-appearance: none;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0px 2px 4px rgba(0,0,0,.4);
	}
	&:active {
		transform: translateY(0);
		box-shadow: none;
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
