import { FirebaseError, FirebaseOptions } from 'firebase/app';
import * as React from 'react';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';
import {
  appleLogin,
  emailLinkCheck,
  emailLinkLogin,
  googleLogin,
  microsoftLogin,
  register,
} from 'core';
import { UserCredential } from 'firebase/auth';

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
  apple: () => void;
  microsoft: () => void;
  emailLink: (email: string) => void;
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
  const redirectCallback = React.useCallback(() => {
    const defaultRedirectUrl = `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}`;
    const query = router.query;
    if (query.redirect) {
      let redirectUrl = query.redirect as string;
      if (redirectUrl.startsWith(defaultRedirectUrl)) {
        if (query.plan) {
          redirectUrl += `&plan=${query.plan}`;
        }
        if (query.type) {
          redirectUrl += `&type=${query.type}`;
        }
        window.location.replace(redirectUrl as string);
        return;
      }
    }
    window.location.replace(defaultRedirectUrl + '/research');
  }, [router]);

  React.useEffect(() => {
    try {
      switch (state) {
        case 'SIGNED_OUT':
          emailLinkCheck(
            (r) => {
              window.localStorage.removeItem('emailForSignIn');
              onSuccessLogin(r);
            },
            (err) => setError(err),
            window.location.href
          );
          break;
        case 'REGISTERED':
          redirectCallback();
          break;
        case 'UNREGISTERED':
          register().then((state) => redirectCallback());
          break;
        default:
          break;
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }, [onSuccessLogin, state, redirectCallback]);

  // React.useEffect(() => {
  //   const query = router.query;
  //   if (state === 'REGISTERED') {
  //     if (query.redirect) {
  //       window.location.replace(query.redirect as string);
  //     } else {
  //       window.location.replace(defaultRedirectUrl + '/research');
  //     }
  //   } else if (state === 'UNREGISTERED') {
  //     register().then((state) => router.back());
  //   }
  // }, [state, router, defaultRedirectUrl]);

  const google = () => {
    googleLogin(onSuccessLogin, (err: FirebaseError) => {
      setError(err.message);
    });
  };

  const apple = () => {
    appleLogin(onSuccessLogin, (err: FirebaseError) => {
      setError(err.message);
    });
  };

  const emailLink = (email: string) => {
    emailLinkLogin((err: FirebaseError) => setError(err.message), email, {
      url: window.location.href,
      handleCodeInApp: true,
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

  return (
    <>{children({ login: { google, apple, microsoft, emailLink }, error })}</>
  );
};

export default Auth;
