import * as React from 'react';
import { Header } from 'ui';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import config from '@/firebase/config';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PlatformFooter } from 'platform-js';

const AuthHeader = dynamic(
  async () => await (await import('platform-js')).AuthHeader,
  {
    loading: (props) => {
      return (
        <Header
          logo={<Image src={logo} width={133} height={40} alt="k33-logo" />}
        >
          {null}
        </Header>
      );
    },
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
          logo={
            <Link href={process.env.NEXT_PUBLIC_PLATFORM_URL as string}>
              <Image src={logo} width={133} height={40} alt="k33-logo" />
            </Link>
          }
          authUrl={'auth'}
          registrationUrl={'register'}
        />
        <main className="flex flex-col">{children}</main>
      </div>
      <PlatformFooter
        logo={<Image src={logo} width={133} height={40} alt="k33-logo" />}
      />
    </>
  );
};

export default MainLayout;
