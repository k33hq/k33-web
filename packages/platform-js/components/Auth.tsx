import { FirebaseOptions } from 'firebase/app';
import * as React from 'react';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';
import { BrandButton, Stack } from 'ui';
import { FcGoogle } from 'react-icons/fc';
import { AppStates, googleLogin } from 'core';

interface AuthProps {
  firebaseConfig: FirebaseOptions;
  registrationUrl: string;
}

const Auth: React.FC<AuthProps> = ({ firebaseConfig, registrationUrl }) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();

  React.useEffect(() => {
    if (state === 'REGISTRED') {
      router.push('/');
    } else if (state === 'UNREGISTRED') {
      // router.replace('https://dev.k33.com/register', undefined, {
      //   shallow: true,
      // });
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
        router.reload();
      },
      (err) => {
        // ignore for now
      }
    );
  };

  return (
    <Stack>
      <BrandButton
        label="Sign in with Google"
        logo={<FcGoogle width={22} height={22} />}
        onClick={google}
      />
    </Stack>
  );
};

export default Auth;
