import { FirebaseOptions } from 'firebase/app';
import * as React from 'react';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';
import { BrandButton, Stack } from 'ui';
import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';
import { googleLogin, microsoftLogin } from 'core';
import { UserCredential } from 'firebase/auth';

interface AuthProps {
  firebaseConfig: FirebaseOptions;
  registrationUrl: string;
  onSuccessLogin: (user: UserCredential) => void;
}

const Auth: React.FC<AuthProps> = ({
  firebaseConfig,
  registrationUrl,
  onSuccessLogin,
}) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();

  React.useEffect(() => {
    if (state === 'REGISTRED') {
      router.push('/');
    } else if (state === 'UNREGISTRED') {
      if (registrationUrl.includes('https')) {
        window.location.href = registrationUrl;
      } else {
        router.push(registrationUrl);
      }
    }
  }, [state, router, registrationUrl]);

  const google = () => {
    googleLogin(
      (user) => {
        onSuccessLogin(user);
      },
      (err) => {
        // ignore for now
      }
    );
  };

  const microsoft = () => {
    microsoftLogin(
      (user) => {
        onSuccessLogin(user);
      },
      (err) => {}
    );
  };

  return (
    <Stack>
      <BrandButton
        label="Sign in with Google"
        logo={<FcGoogle width={22} height={22} />}
        onClick={google}
      />
      {/* <BrandButton
        label="Sign in with Microsoft"
        logo={<BsMicrosoft width={22} height={22} />}
        onClick={microsoft}
      /> */}
    </Stack>
  );
};

export default Auth;
