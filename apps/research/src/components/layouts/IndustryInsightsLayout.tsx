import * as React from 'react';
import TabLayout, { TabLayoutProps } from './TabLayout';
import { getLevelTwos } from '@/utils';

interface IndustryInsightsLayoutProps
  extends React.PropsWithChildren,
    Pick<TabLayoutProps, 'activeKey'> {}

const IndustryInsightsLayout: React.FC<IndustryInsightsLayoutProps> = ({
  children,
  activeKey,
}) => {
  return (
    <TabLayout
      description="Gain a competitive edge in the dynamic digital assets industry. Stay informed about the latest trends and news shaping the future landscape while navigating its intricate landscape with our expert industry insights."
      activeKey={activeKey}
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {children}
    </TabLayout>
  );
};

export default IndustryInsightsLayout;
