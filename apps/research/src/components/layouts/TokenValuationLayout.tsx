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
      description="Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential."
      activeKey={activeKey}
      title="Token Valuation"
      tabs={getLevelTwos('token-valuation')}
    >
      {children}
    </TabLayout>
  );
};

export default TokenValuationLayout;
