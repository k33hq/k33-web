/* eslint-disable @next/next/inline-script-id */
import { NextPage } from 'next';
import Cookie from './components/Cookie';
import Script from 'next/script';

export * from './components';
export * from './hooks';
export * from './utils';

interface K33AppProps {
  children: React.ReactNode;
}

const K33App: NextPage<K33AppProps> = ({ children }) => {
  //TODO: do cookie stuff
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
      />
      <Script
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
      <Cookie />
      {children}
    </>
  );
};

export default K33App;

// whitelisting
