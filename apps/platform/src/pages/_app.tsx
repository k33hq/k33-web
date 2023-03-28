import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import { NextPageWithLayout } from 'ui';
import K33App from 'platform-js';
import Script from 'next/script';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});

interface PlatformAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const PlatformApp = ({ Component, pageProps }: PlatformAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <K33App>{getLayout(<Component {...pageProps} />)}</K33App>;
};

export default PlatformApp;
