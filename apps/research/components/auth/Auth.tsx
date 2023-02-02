'use client';
import { init } from 'core';
import config from '../../firebase/config';
import * as React from 'react';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  React.useEffect(() => {
    init(config);
  }, []);
  return <>{children}</>;
};

export default Auth;
