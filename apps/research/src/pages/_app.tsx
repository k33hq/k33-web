import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import K33App from 'platform-js';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import withTheme from '../theme';
import { MainLayout } from '@/components';
import '../../public/antd.min.css';
import '../styles/globals.scss';
import Script from 'next/script';

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
      <Script
        rel="preconnect"
        strategy="afterInteractive"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-script"
        defer
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}');
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
            });
          `,
        }}
      />

      <MainLayout>{getLayout(<Component {...props.pageProps} />)}</MainLayout>
    </Provider>
  );
};

export default ResearchApp;
