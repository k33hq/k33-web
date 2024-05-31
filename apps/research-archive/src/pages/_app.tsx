import { AppProps } from 'next/app';
import { Manrope } from '@next/font/google';
import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import withTheme from '../theme';
import { MainLayout } from '@/components';
import '../../public/antd.min.css';
import '../styles/globals.scss';

export const manrope = Manrope({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-manrope',
});

interface ResearchAppProps extends AppProps {
  Component: NextPageWithLayout;
}

// TODO: add the cookie popup
const ResearchApp = ({ Component, ...rest }: ResearchAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (typeof window !== 'undefined') {
    window.onload = () => {
      document.getElementById('holderStyle')!.remove();
    };
  }

  return withTheme(
    <>
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
      <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
        <MainLayout>{getLayout(<Component {...rest.pageProps} />)}</MainLayout>
      </div>
    </>
  );
};

export default ResearchApp;
