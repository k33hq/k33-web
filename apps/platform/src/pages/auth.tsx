import { NextPage } from 'next';
import { Auth as AuthComponent, getTitle } from 'platform-js';
import config from '@/firebase/config';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Auth: NextPage = () => {
  const router = useRouter();
  return (
    <div className="container items-center flex flex-col justify-center md:gap-10 gap-8 mt-44">
      <Head>
        <title>{getTitle('Auth')}</title>
      </Head>
      <Image src={logo} width={200} height={100} alt="k33-logo" />
      <div className="w-96">
        <AuthComponent
          firebaseConfig={config}
          registrationUrl="/register"
          onSuccessLogin={(user) => {
            router.reload();
          }}
        />
      </div>
    </div>
  );
};

export default Auth;
