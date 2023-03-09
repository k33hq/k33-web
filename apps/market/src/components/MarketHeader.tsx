import * as React from 'react';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import config from '@/firebase/config';
import { Header, SecondaryHeader } from 'ui';
import marketsLogo from '../assets/markets-logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MarketHeaderProps {}

// TODO: upgrade the secondary header here with the ui one
const AuthHeader = dynamic(
  async () => await (await import('platform-js')).AuthHeader,
  {
    loading: (props) => (
      <Header
        transparent
        logo={
          <Image
            src={logo}
            height={24}
            width={94}
            alt="company logo"
            style={{
              filter: 'invert(100%)',
            }}
          />
        }
      >
        {null}
      </Header>
    ),
    ssr: false,
  }
);

const MarketHeader: React.FC<MarketHeaderProps> = ({}) => {
  const router = useRouter();
  const isLanding =
    router.pathname.startsWith('/products/') || router.pathname === '/';
  return (
    <>
      <AuthHeader
        logo={
          <Link href={process.env.NEXT_PUBLIC_PLATFORM_URL as string}>
            <Image
              src={logo}
              height={24}
              width={94}
              alt="company logo"
              style={{
                filter: 'invert(100%)',
              }}
            />
          </Link>
        }
        authUrl={process.env.NEXT_PUBLIC_PLATFORM_URL + 'auth'}
        registrationUrl={process.env.NEXT_PUBLIC_PLATFORM_URL + 'register'}
        firebaseConfig={config}
        transparent={true}
      />

      <nav className={`navbar w-full bg-bg-dark-primary`}>
        <div className="md:container flex flex-row md:gap-12 gap-6 items-center md:justify-center h-10 md:px-0 px-6 overflow-auto">
          <Link href={process.env.NEXT_PUBLIC_MARKETS_URL as string}>
            <Image
              src={marketsLogo}
              alt="markets-logo"
              width={109}
              height={12}
            />
          </Link>

          <div className="flex-1" />
        </div>
      </nav>
    </>
  );
};

export default MarketHeader;
