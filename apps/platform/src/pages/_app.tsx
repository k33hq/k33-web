import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import { MainLayout } from '@/layouts';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});

interface PlatformAppProps extends AppProps {}

const PlatformApp = ({ Component, pageProps }: PlatformAppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} />{' '}
    </MainLayout>
  );
};

export default PlatformApp;
