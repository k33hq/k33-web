import { AppProps } from 'next/app';
import '../../public/antd.min.css';
import '../styles/globals.scss';
import { NextPageWithLayout } from 'platform-js';

import withTheme from '@/theme';

interface PlatformAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const PlatformApp = ({ Component, pageProps }: PlatformAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return withTheme(<>{getLayout(<Component {...pageProps} />)}</>);
};

export default PlatformApp;
