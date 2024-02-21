import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import K33App, { NextPageWithLayout } from 'platform-js';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});

interface PlatformAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const VaultApp = ({ Component, ...rest }: PlatformAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props: pageProps } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <K33App>{getLayout(<Component {...pageProps} />)}</K33App>
    </Provider>
  );
};

export default VaultApp;
