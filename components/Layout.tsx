import { createTheme } from '@mui/material/styles';
import Head from 'next/head';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import classes from '../utils/classes';

interface IProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Layout({ title, description, children }: IProps) {
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
  });
  return (
    <>
      <Head>
        {description && <meta name="description" content={description}></meta>}
        <title>{title ? `HCWP | ${title}` : 'Have Camera Will Pedal'}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appBar}>
          <Toolbar sx={classes.toolbar}>
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.logo}>HCWP</Typography>
              </Link>
            </NextLink>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Typography>All rights reserved. Have Camera Will Pedal.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
