import { AppProps } from 'next/app';
import '../../public/antd.min.css';
import '../styles/globals.scss';
import { NextPageWithLayout } from 'ui';
import K33App from 'platform-js';
import { DefaultLayout } from '@/components';
import withTheme from '@/theme';

interface PlatformAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const PlatformApp = ({ Component, pageProps }: PlatformAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return withTheme(<>{getLayout(<Component {...pageProps} />)}</>);
};

export default PlatformApp;
