import config from '@/firebase/config';
import * as React from 'react';
import { init } from 'core';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  init(config);
  return (
    <>
      {children}
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm" />
    </>
  );
};

export default PrivateLayout;
