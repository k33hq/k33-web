import { AppContext, AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import App from 'next/app';
import { getCategoryElements } from '@/api';
import { CategoryElements } from '@/types';
import { MainLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';

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

const ResearchApp = ({
  Component,
  pageProps,
  categories,
}: ResearchAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MainLayout categories={categories}>
      {getLayout(<Component {...pageProps} />)}
    </MainLayout>
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
