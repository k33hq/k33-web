import { AppContext, AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import App from 'next/app';
import { getCategoryElements } from '@/api';
import { CategoryElements } from '@/types';
import { MainLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';
import K33App from 'platform-js';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});

interface ResearchAppProps extends AppProps {
  categories: CategoryElements;
  Component: NextPageWithLayout;
}

const ResearchApp = ({ Component, categories, ...rest }: ResearchAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <K33App>
        <MainLayout categories={categories}>
          {getLayout(<Component {...props.pageProps} />)}
        </MainLayout>
      </K33App>
    </Provider>
  );
};

ResearchApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const categories = await getCategoryElements();
  return {
    ...pageProps,
    categories,
  };
};

export default ResearchApp;
