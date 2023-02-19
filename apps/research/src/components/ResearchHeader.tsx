import * as React from 'react';
import SecondaryHeader, { SecondaryHeaderProps } from './SecondaryHeader';
import logo from '../assets/logo.svg';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import config from '@/firebase/config';
import { Header } from 'ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ResearchHeaderProps extends SecondaryHeaderProps {}

// TODO: upgrade the secondary header here with the ui one
const AuthHeader = dynamic(
  async () => await (await import('platform-js')).AuthHeader,
  {
    loading: (props) => (
      <Header
        logo={<Image src={logo} height={24} width={94} alt="company logo" />}
      >
        {null}
      </Header>
    ),
    ssr: false,
  }
);

const ResearchHeader: React.FC<ResearchHeaderProps> = ({ categories }) => {
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
                filter: isLanding ? 'invert(100%)' : '',
              }}
            />
          </Link>
        }
        authUrl={process.env.NEXT_PUBLIC_PLATFORM_URL + '/auth'}
        registrationUrl={process.env.NEXT_PUBLIC_PLATFORM_URL + '/register'}
        firebaseConfig={config}
        transparent={isLanding}
      />

      <SecondaryHeader categories={categories} />
    </>
  );
};

export default ResearchHeader;
