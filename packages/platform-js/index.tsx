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
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
  
        gtag('config', ${process.env.NEXT_PUBLIC_MEASUREMENT_ID});
        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
        });
        `}
      </Script>
      <Cookie />
      {children}
    </>
  );
};

export default K33App;

// whitelisting
