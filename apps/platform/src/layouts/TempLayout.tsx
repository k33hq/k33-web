import * as React from 'react';
import { Header, SecondaryHeader } from 'ui';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import config from '@/firebase/config';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PlatformFooter } from 'platform-js';
import investmentLogo from '../assets/investments-logo.png';

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

interface TemplLayoutProps {
  children: React.ReactNode;
}

const TempLayout: React.FC<TemplLayoutProps> = ({ children }) => {
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
        <SecondaryHeader
          branding={
            <Link href={process.env.NEXT_PUBLIC_MARKETS_URL as string}>
              <Image
                src={investmentLogo}
                alt="k33-investments"
                width={109}
                height={12}
              />
            </Link>
          }
        >
          {null}
        </SecondaryHeader>

        <main className="flex flex-col">{children}</main>
      </div>
      <PlatformFooter
        logo={<Image src={logo} width={133} height={40} alt="k33-logo" />}
      />
    </>
  );
};

export default TempLayout;
