import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import * as React from 'react';
import { NextPageWithLayout } from 'ui';
import K33App from 'platform-js';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import withTheme from '../theme';
import { MainLayout } from '@/components';
import '../../public/antd.min.css';
import '../styles/globals.scss';

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
      <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
        <MainLayout>{getLayout(<Component {...props.pageProps} />)}</MainLayout>
      </div>
    </Provider>
  );
};

export default ResearchApp;
