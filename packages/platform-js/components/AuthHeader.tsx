import { BasicButton, Header } from 'ui';
import { FirebaseOptions } from 'firebase/app';
import { init } from 'core';

interface AuthHeaderProps {
  logo: React.ReactNode;
  firebaseConfig: FirebaseOptions;
}
const AuthHeader: React.FC<AuthHeaderProps> = ({ logo, firebaseConfig }) => {
  init(firebaseConfig);

  return (
    <Header logo={logo}>
      <BasicButton variant="secondary" size="medium">
        Get Started
      </BasicButton>
    </Header>
  );
};

export default AuthHeader;
