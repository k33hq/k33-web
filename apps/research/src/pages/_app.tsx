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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        id="linked_k33_id"
        dangerouslySetInnerHTML={{
          __html: `_linkedin_partner_id = "2684138"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
        }}
      />

      <Script
        type="text/javascript"
        strategy="afterInteractive"
        id="linked_k33_script"
        dangerouslySetInnerHTML={{
          __html: `(function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk); `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=2684138&fmt=gif"
        />
      </noscript>
      <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
        <MainLayout>{getLayout(<Component {...props.pageProps} />)}</MainLayout>
      </div>
    </Provider>
  );
};

export default ResearchApp;
