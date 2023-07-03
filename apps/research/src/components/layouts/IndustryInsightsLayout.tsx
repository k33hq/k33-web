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
      description="Here you will find a nice description of the page that will help you 
      understand a bit better."
      activeKey={activeKey}
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {children}
    </TabLayout>
  );
};

export default IndustryInsightsLayout;
