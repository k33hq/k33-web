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
      description="Here you will find a nice description of the page that will help you 
  understand a bit better."
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {children}
    </TabLayout>
  );
};

export default MarketInsights;
