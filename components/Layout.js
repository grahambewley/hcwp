import { useContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Head from 'next/head';
import {
	AppBar,
	Badge,
	Box,
	Button,
	Container,
	CssBaseline,
	Link,
	Menu,
	MenuItem,
	Switch,
	ThemeProvider,
	Toolbar,
	Typography,
} from '@mui/material';
import NextLink from 'next/link';
import classes from '@/utils/classes';
import { Store } from '@/utils/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
	const router = useRouter();
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

	const [anchorEl, setAnchorEl] = useState(null);

	const darkModeChangeHandler = () => {
		dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
		const newDarkMode = !darkMode;
		Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
	};

	const loginMenuCloseHandler = (e, redirect) => {
		setAnchorEl(null);
		if (redirect) {
			router.push(redirect);
		}
	};

	const loginClickHandler = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const logoutClickHandler = () => {
		setAnchorEl(null);
		dispatch({ type: 'USER_LOGOUT' });
		Cookies.remove('userInfo');
		Cookies.remove('cartItems');
		router.push('/');
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
									<>
										<Button
											aria-controls="simple-menu"
											aria-haspopup="true"
											sx={classes.navbarButton}
											onClick={loginClickHandler}
										>
											{userInfo.name}
										</Button>
										<Menu
											id="simple-menu"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={loginMenuCloseHandler}
										>
											<MenuItem
												onClick={(e) =>
													loginMenuCloseHandler(
														e,
														'/profile'
													)
												}
											>
												Profile
											</MenuItem>
											<MenuItem
												onClick={logoutClickHandler}
												title
											>
												Logout
											</MenuItem>
										</Menu>
									</>
								) : (
									<NextLink href="/login" passHref>
										<Link>Login</Link>
									</NextLink>
								)}
							</Box>
						</Box>
					</Toolbar>
				</AppBar>
				<main>{children}</main>
				<Box component="footer" sx={classes.footer}>
					<Typography>
						All rights reserved. Have Camera Will Pedal.
					</Typography>
				</Box>
			</ThemeProvider>
		</>
	);
}
