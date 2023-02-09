import { useContext } from 'react';
import { createTheme } from '@mui/material/styles';
import Head from 'next/head';
import {
	AppBar,
	Badge,
	Box,
	Container,
	CssBaseline,
	Link,
	Switch,
	ThemeProvider,
	Toolbar,
	Typography,
} from '@mui/material';
import NextLink from 'next/link';
import classes from '@/utils/classes';
import { Store } from '@/utils/store';
import Cookies from 'js-cookie';

export default function Layout({ title, description, children }) {
	const { state, dispatch } = useContext(Store);
	const { darkMode, cart, userInfo } = state;
	const theme = createTheme({
		typography: {
			h1: {
				fontSize: '1.6rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
			h2: {
				fontSize: '1.4rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
		},
		palette: {
			mode: darkMode ? 'dark' : 'light',
		},
	});

	const darkModeChangeHandler = () => {
		dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
		const newDarkMode = !darkMode;
		Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
	};

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
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static" sx={classes.appBar}>
					<Toolbar sx={classes.toolbar}>
						<Box display="flex" alignItems="center">
							<NextLink href="/" passHref>
								<Link>
									<Typography sx={classes.logo}>
										HCWP
									</Typography>
								</Link>
							</NextLink>
							<Box>
								<Switch
									checked={darkMode}
									onChange={darkModeChangeHandler}
								></Switch>
								<NextLink href="cart" passHref>
									<Link>
										<Typography component="span">
											{cart.cartItems.length > 0 ? (
												<Badge
													color="secondary"
													badgeContent={
														cart.cartItems.length
													}
												>
													Cart
												</Badge>
											) : (
												'Cart'
											)}
										</Typography>
									</Link>
								</NextLink>
								{userInfo ? (
									<NextLink href="/profile" passHref>
										<Link>{userInfo.name}</Link>
									</NextLink>
								) : (
									<NextLink href="/login" passHref>
										<Link>Login</Link>
									</NextLink>
								)}
							</Box>
						</Box>
					</Toolbar>
				</AppBar>
				<Container component="main" sx={classes.main}>
					{children}
				</Container>
				<Box component="footer" sx={classes.footer}>
					<Typography>
						All rights reserved. Have Camera Will Pedal.
					</Typography>
				</Box>
			</ThemeProvider>
		</>
	);
}
