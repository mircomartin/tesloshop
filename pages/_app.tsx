import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { SWRConfig } from 'swr';

import { UIProvider, CartProvider } from '../context';

import { lightTheme } from './../themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
			}}
		>
			<CartProvider>
				<UIProvider>
					<ThemeProvider theme={lightTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UIProvider>
			</CartProvider>
		</SWRConfig>
	);
}

export default MyApp;
