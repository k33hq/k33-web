import { NextPage } from 'next';
import { Auth as AuthComponent } from 'platform-js';
import config from '@/firebase/config';
import Image from 'next/image';
import logo from '../assets/logo.svg';

const Auth: NextPage = () => {
  return (
    <div className="container items-center flex flex-col justify-center md:gap-10 gap-8 mt-44">
      <Image src={logo} width={200} height={100} alt="k33-logo" />
      <div className="w-96">
        <AuthComponent
          firebaseConfig={config}
          home="/"
          registration="/register"
        />
      </div>
    </div>
  );
};

export default Auth;
