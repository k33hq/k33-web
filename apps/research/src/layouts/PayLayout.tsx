import { useK33App } from '@/hooks';
import * as React from 'react';
import { PayWall } from 'ui';

interface PayLayoutProps {
  children: React.ReactNode;
}

const PayLayout: React.FC<PayLayoutProps> = ({ children }) => {
  const [state] = useK33App();
  return <PayWall>{children}</PayWall>;
};

export default PayLayout;
