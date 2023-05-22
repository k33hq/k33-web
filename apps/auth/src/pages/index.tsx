/* eslint-disable turbo/no-undeclared-env-vars */
import { NextPage } from 'next';
import { Auth as AuthComponent, getTitle } from 'platform-js';
import config from '@/firebase/config';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// TODO: take on success and on failure
const Auth: NextPage = () => {
  const router = useRouter();
  return (
    <div className="container items-center flex flex-col justify-center md:gap-10 gap-8 mt-44">
      <Head>
        <title>{getTitle('Auth')}</title>
      </Head>
      <Image src={logo} width={200} height={100} alt="k33-logo" />
      <div className="w-96 flex flex-col gap-2">
        <AuthComponent
          firebaseConfig={config}
          registrationUrl="/register"
          onSuccessLogin={(user) => {
            router.reload();
          }}
        />
        <div className="px-6 md:px-0 text-center text-small justify-center flex flex-col">
          <p>
            {`By continuing you agree to K33’s `}
            <Link
              className="underline"
              href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/terms-and-conditions`}
            >
              Terms of Service
            </Link>
            {` and acknowledge that K33’s `}
            <Link
              className="underline"
              href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/privacy`}
            >
              Privacy Policy
            </Link>
            {` applies to you.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
