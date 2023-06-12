import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { NextPageWithLayout } from 'ui';
import K33App from 'platform-js';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import withTheme from '../theme';
import { MainLayout } from '@/components';
import '../../public/antd.min.css';
import '../styles/globals.scss';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});

interface ResearchAppProps extends AppProps {
  Component: NextPageWithLayout;
}

// TODO: add the cookie popup
const ResearchApp = ({ Component, ...rest }: ResearchAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  return withTheme(
    <Provider store={store}>
      <MainLayout>{getLayout(<Component {...props.pageProps} />)}</MainLayout>
    </Provider>
  );
};

export default ResearchApp;
