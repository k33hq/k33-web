import * as React from 'react';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import config from '@/firebase/config';
import { Header } from 'ui';
import investmentLogo from '../assets/investments-logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface InvestHeaderProps {}

// TODO: upgrade the secondary header here with the ui one
const AuthHeader = dynamic(
  async () => await (await import('platform-js')).AuthHeader,
  {
    loading: (props) => (
      <Header
        transparent
        logo={<Image src={logo} height={40} width={97} alt="company logo" />}
      >
        {null}
      </Header>
    ),
    ssr: false,
  }
);

const InvestHeader: React.FC<InvestHeaderProps> = ({}) => {
  const router = useRouter();
  const isLanding =
    router.pathname.startsWith('/products/') || router.pathname === '/';
  return (
    <>
      <AuthHeader
        logo={
          <Link href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}`}>
            <Image src={logo} height={40} width={97} alt="company logo" />
          </Link>
        }
        authUrl={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
        registrationUrl={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/register`}
        firebaseConfig={config}
        transparent={true}
      />

      <nav className={`navbar w-full bg-bg-dark-primary`}>
        <div className="md:container flex flex-row md:gap-12 gap-6 items-center md:justify-center h-10 md:px-0 px-6 overflow-auto">
          <Link
            href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/apps/invest`}
          >
            <Image
              src={investmentLogo}
              alt="k33-investments"
              width={111}
              height={10}
            />
          </Link>

          <div className="flex-1" />
        </div>
      </nav>
    </>
  );
};

export default InvestHeader;
