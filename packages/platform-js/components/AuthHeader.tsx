import { BasicButton, Header } from 'ui';
import * as React from 'react';
import { FirebaseOptions } from 'firebase/app';
import { AppStates, init, logout } from 'core';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';

interface AuthHeaderProps {
  logo: React.ReactNode;
  firebaseConfig: FirebaseOptions;
  authUrl: string;
  registrationUrl: string;
}

const loginText: Record<AppStates, string> = {
  LOADING: 'Get Started',
  SIGNED_OUT: 'Get Started',
  UNREGISTRED: 'Register Now',
  REGISTRED: 'Sign Out',
};
const AuthHeader: React.FC<AuthHeaderProps> = ({
  logo,
  firebaseConfig,
  authUrl,
  registrationUrl,
}) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();

  return (
    <Header logo={logo}>
      <BasicButton
        variant="secondary"
        size="medium"
        onClick={() => {
          switch (state) {
            case 'SIGNED_OUT':
              if (authUrl.includes('https://')) {
                window.location.href = authUrl;
              } else {
                router.push('/auth');
              }
              break;
            case 'UNREGISTRED':
              if (registrationUrl.includes('https://')) {
                window.location.href = registrationUrl;
              } else {
                router.push(registrationUrl);
              }
              break;
            case 'REGISTRED':
              logout(
                () => {
                  router.reload();
                },
                (err) => console.log(err)
              );
              break;
            default:
              router.push('/auth');
              break;
          }
        }}
      >
        {loginText[state]}
      </BasicButton>
    </Header>
  );
};

export default AuthHeader;
