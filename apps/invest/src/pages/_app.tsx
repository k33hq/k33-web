import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import { MainLayout } from '@/layouts';
import K33App from 'platform-js';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});

interface PlatformAppProps extends AppProps {}

const PlatformApp = ({ Component, pageProps }: PlatformAppProps) => {
  return (
    <K33App>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </K33App>
  );
};

export default PlatformApp;
