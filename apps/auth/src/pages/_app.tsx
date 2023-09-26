import { AppProps } from 'next/app';
import '../../public/antd.min.css';
import '../styles/globals.scss';
import { NextPageWithLayout } from 'platform-js';
import Script from 'next/script';

import withTheme from '@/theme';

interface PlatformAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const PlatformApp = ({ Component, pageProps }: PlatformAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return withTheme(
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-script"
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
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default PlatformApp;
