import * as React from 'react';
import TabLayout, { TabLayoutProps } from './TabLayout';
import { getLevelTwos } from '@/utils';

interface TokenValuationLayoutProps
  extends React.PropsWithChildren,
    Pick<TabLayoutProps, 'activeKey'> {}

const TokenValuationLayout: React.FC<TokenValuationLayoutProps> = ({
  children,
  activeKey,
}) => {
  return (
    <TabLayout
      description="Here you will find a nice description of the page that will help you 
      understand a bit better."
      activeKey={activeKey}
      title="Token Valuation"
      tabs={getLevelTwos('token-valuation')}
    >
      {children}
    </TabLayout>
  );
};

export default TokenValuationLayout;
