import { AppProps } from 'next/app';
import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import withTheme from '../theme';
import { MainLayout } from '@/components';
import '../styles/globals.scss';
import Script from 'next/script';

interface ResearchAppProps extends AppProps {
  Component: NextPageWithLayout;
}

// TODO: add the cookie popup
const ResearchApp = ({ Component, ...rest }: ResearchAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (typeof window !== 'undefined') {
    window.onload = () => {
      document.getElementById('holderStyle')!.remove();
    };
  }

  return withTheme(
    <Provider store={store}>
      <style
        id="holderStyle"
        dangerouslySetInnerHTML={{
          __html: `
                    *, *::before, *::after {
                        transition: none!important;
                    }
                    `,
        }}
      />
      <Script
        rel="preconnect"
        strategy="afterInteractive"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
      />
      <link rel="dns-prefetch" href="https://snap.licdn.com" />
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
      <Script
        id="hotjar-script"
        defer
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3855489,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />

      <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
        <MainLayout>{getLayout(<Component {...props.pageProps} />)}</MainLayout>
      </div>
    </Provider>
  );
};

export default ResearchApp;
