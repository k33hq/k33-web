import { FirebaseOptions } from 'firebase/app';
import * as React from 'react';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';
import { BrandButton, Stack } from 'ui';
import { FcGoogle } from 'react-icons/fc';
import { googleLogin } from 'core';

interface AuthProps {
  firebaseConfig: FirebaseOptions;
  home: string;
  registration: string;
}

const Auth: React.FC<AuthProps> = ({ firebaseConfig, home, registration }) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();

  React.useEffect(() => {
    if (state === 'REGISTRED') {
      router.push(home);
    } else if (state === 'UNREGISTRED') {
      router.push(registration);
    }
  }, [state, router, registration, home]);

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
