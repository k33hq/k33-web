import * as React from 'react';
import { Header, SecondaryHeader } from 'ui';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import config from '@/firebase/config';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PlatformFooter } from 'platform-js';
import vaultLogo from '../assets/vault-logo.svg';

const AuthHeader = dynamic(
  async () => await (await import('platform-js')).AuthHeader,
  {
    loading: (props) => {
      return (
        <Header
          logo={<Image src={logo} width={97} height={40} alt="k33-logo" />}
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
      <div className="xl:ui-container min-h-screen pb-12">
        <AuthHeader
          firebaseConfig={config}
          logo={
            <a href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}`}>
              <Image src={logo} width={97} height={40} alt="k33-logo" />
            </a>
          }
          authUrl={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth?redirect=https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/apps/vault`}
          registrationUrl={'/register'}
        />
        <SecondaryHeader
          branding={
            <Link href={`/`}>
              <Image src={vaultLogo} alt="vault-logo" height={16} />
            </Link>
          }
        >
          {null}
        </SecondaryHeader>
        <main className="flex flex-col">{children}</main>
      </div>
      <div>
        <PlatformFooter
          logo={<Image src={logo} width={97} height={40} alt="k33-logo" />}
        />
      </div>
    </>
  );
};

export default MainLayout;
