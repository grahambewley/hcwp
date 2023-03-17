import { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Container } from '@/utils/sharedStyles';

const NavBar = styled.header`
	width: 100%;
	padding: 1rem 0;
	background-color: white;
`;
const NavWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
`;
const NavLink = styled.a`
	color: black;
	text-decoration: none;
`;

export default function Layout({ title, description, children }) {
	const router = useRouter();
	return (
		<>
			<Head>
				{description && (
					<meta name="description" content={description}></meta>
				)}
				<title>
					{title ? `HCWP | ${title}` : 'Have Camera Will Pedal'}
				</title>
			</Head>
				<NavBar>
					<Container>
						<NavWrapper>
							<NextLink href={'/'} passHref>
								<NavLink>Home</NavLink>
							</NextLink>
							<div>
								<NextLink href={'/collections'} passHref>
									<NavLink>Collections</NavLink>
								</NextLink>
								<NextLink href={'/about'} passHref>
									<NavLink>About</NavLink>
								</NextLink>
								<NextLink href={'/about'} passHref>
									<NavLink>Contact</NavLink>
								</NextLink>
							</div>
						</NavWrapper>
					</Container>
				</NavBar>
				<main>{children}</main>
		</>
	);
}
