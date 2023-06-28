import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

const MarketInsights: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Research - Market Insights" />
      <h1>Valuation home</h1>
    </>
  );
};

MarketInsights.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="quick-takes"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export default MarketInsights;
