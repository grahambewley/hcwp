import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Typography } from '@mui/material';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <Layout>List Products</Layout>;
}
