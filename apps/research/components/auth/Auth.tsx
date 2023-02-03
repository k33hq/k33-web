import config from '../../firebase/config';
import * as React from 'react';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  return <>{children}</>;
};

export default Auth;
