import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from '../utils/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		</SnackbarProvider>
	);
}
