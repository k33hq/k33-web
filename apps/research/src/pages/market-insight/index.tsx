import { TabLayout } from '@/components';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const MarketInsights: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Valuation home</h1>
    </>
  );
};

MarketInsights.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      title="Market Insights"
      tabs={[
        { key: 'analysis', label: 'Analysis' },
        { key: 'principles', label: 'Principles' },
      ]}
    >
      {page}
    </TabLayout>
  );
};

export default MarketInsights;
