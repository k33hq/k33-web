import { FirebaseError, FirebaseOptions } from 'firebase/app';
import * as React from 'react';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';
import { BrandButton, Stack } from 'ui';
import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';
import { googleLogin, microsoftLogin, register } from 'core';
import { UserCredential } from 'firebase/auth';
import Link from 'next/link';

interface DiffCredData {
  appName: string;
  email: string;
  _tokenResponse: {
    context: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    federatedId: string;
    firstName: string;
    fullName: string;
    kind: string;
    lastName: string;
    localId: string;
    needConfirmation: boolean;
    oauthAccessToken: string;
    oauthExpireIn: number;
    oauthIdToken: string;
    pendingToken: string;
    providerId: string;
    rawUserInfo: string;
    verifiedProvider: ReadonlyArray<string>;
  };
}

export interface LoginOptions {
  google: () => void;
  microsoft: () => void;
}

export interface AuthFunctionalities {
  login: LoginOptions;
  error: string | null;
}

interface AuthProps {
  firebaseConfig: FirebaseOptions;
  onSuccessLogin: (user: UserCredential) => void;
  children: (props: AuthFunctionalities) => React.ReactElement;
}

const Auth: React.FC<AuthProps> = ({
  firebaseConfig,
  onSuccessLogin,
  children,
}) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (state === 'REGISTRED') {
      router.back();
    } else if (state === 'UNREGISTRED') {
      register().then((state) => router.reload());
    }
  }, [state, router]);

  const google = () => {
    googleLogin(onSuccessLogin, (err: FirebaseError) => {
      setError(err.message);
    });
  };

  const microsoft = () => {
    microsoftLogin(onSuccessLogin, (err: FirebaseError) => {
      if (err.code == 'auth/account-exists-with-different-credential') {
        const auth = err.customData as unknown as DiffCredData;
        const providerName = auth._tokenResponse.verifiedProvider[0];
        const email = auth.email;
        const message = `Please sign-in with ${providerName}. You already have an account on K33 with ${email} and you used ${providerName} to create it. If you would like to change your sign-in provider, please contact us at ask@k33.com.`;
        setError(message);
      }
    });
  };

  return <>{children({ login: { google, microsoft }, error })}</>;
};

export default Auth;
