import { AppContext, AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import App from 'next/app';
import Script from 'next/script';
import { getCategoryElements } from '@/api';
import { CategoryElements } from '@/types';
import { MainLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';
import K33App from 'platform-js';

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
    <K33App>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
      <MainLayout categories={categories}>
        {getLayout(<Component {...pageProps} />)}
      </MainLayout>
    </K33App>
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
