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

interface AuthProps {
  firebaseConfig: FirebaseOptions;
  registrationUrl: string;
  onSuccessLogin: (user: UserCredential) => void;
}

const Auth: React.FC<AuthProps> = ({ firebaseConfig, onSuccessLogin }) => {
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
    googleLogin(onSuccessLogin, (err) => {});
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
      <div className="pt-60">
        <p className="px-6 md:px-0 text-center text-default-systemPink-light">
          {error}
        </p>
      </div>
    </Stack>
  );
};

export default Auth;
