import { BasicButton, Header } from 'ui';
import { FirebaseOptions } from 'firebase/app';
import { AppStates, init } from 'core';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';

interface AuthHeaderProps {
  logo: React.ReactNode;
  firebaseConfig: FirebaseOptions;
}

const loginText: Record<AppStates, string> = {
  LOADING: 'Get Started',
  SIGNED_OUT: 'Get Started',
  UNREGISTRED: 'Register Now',
  REGISTRED: 'Sign Out',
};
const AuthHeader: React.FC<AuthHeaderProps> = ({ logo, firebaseConfig }) => {
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
              router.push('/auth');
              break;
            case 'UNREGISTRED':
              router.push('/register');
            case 'REGISTRED':
              console.log('logout');
              break;
            case 'LOADING':
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
