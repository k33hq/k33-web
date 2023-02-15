import { AppContext, AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '../styles/globals.css';
import 'ui/styles.css';
import App from 'next/app';
import Script from 'next/script';
import { getCategoryElements } from '@/api';
import { CategoryElements } from '@/types';
import { MainLayout } from '@/layouts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const ResearchApp = ({
  Component,
  pageProps,
  categories,
}: ResearchAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
      <MainLayout categories={categories}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </MainLayout>
    </>
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
