import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { MainLayout } from 'ui';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});

interface PlatformAppProps extends AppProps {}

const PlatformApp = ({ Component, pageProps }: PlatformAppProps) => {
  return (
    <MainLayout
      logo={<Image src={logo} width={94} height={20} alt="k33-logo" />}
    >
      <Component {...pageProps} />{' '}
    </MainLayout>
  );
};

export default PlatformApp;
