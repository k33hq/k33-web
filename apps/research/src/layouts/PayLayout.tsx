import * as React from 'react';
import { PayWall } from 'ui';

interface PayLayoutProps {
  children: React.ReactNode;
}

const PayLayout: React.FC<PayLayoutProps> = ({ children }) => {
  return <PayWall>{children}</PayWall>;
};

export default PayLayout;
