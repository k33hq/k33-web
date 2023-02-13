import { register } from 'core';
import { FirebaseOptions } from 'firebase/app';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BasicButton } from 'ui';
import { useAppState } from '../hooks';

interface RegistrationProps {
  firebaseConfig: FirebaseOptions;
}

const Registration: React.FC<RegistrationProps> = ({ firebaseConfig }) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();

  React.useEffect(() => {
    if (state === 'REGISTRED') {
      router.push('/');
    }
  }, [state, router]);

  return (
    <BasicButton
      onClick={() => {
        register().then((state) => {
          router.reload();
        });
      }}
      variant="secondary"
      size="medium"
      fullWidth
    >
      Accept and Register
    </BasicButton>
  );
};

export default Registration;
