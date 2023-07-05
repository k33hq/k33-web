import * as React from 'react';
import TabLayout, { TabLayoutProps } from './TabLayout';
import { getLevelTwos } from '@/utils';

interface MarketInsightsProps
  extends React.PropsWithChildren,
    Pick<TabLayoutProps, 'activeKey'> {}

const MarketInsights: React.FC<MarketInsightsProps> = ({
  children,
  activeKey,
}) => {
  return (
    <TabLayout
      activeKey={activeKey}
      description="Stay ahead of the curve in the digital assets market with our comprehensive market insights. Discover the latest trends and factors influencing prices for tomorrow's gains."
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {children}
    </TabLayout>
  );
};

export default MarketInsights;
