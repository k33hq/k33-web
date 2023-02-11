import * as React from 'react';
import { Footer } from 'ui';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import config from '@/firebase/config';
import dynamic from 'next/dynamic';

const AuthHeader = dynamic(
  async () => await (await import('platform-js')).AuthHeader,
  {
    ssr: false,
  }
);

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen pb-12">
        <AuthHeader
          firebaseConfig={config}
          logo={<Image src={logo} width={133} height={40} alt="k33-logo" />}
        />
        <main className="flex lex-col md:container">{children}</main>
      </div>
      <Footer
        logo={<Image src={logo} width={133} height={40} alt="k33-logo" />}
      />
    </>
  );
};

export default MainLayout;
