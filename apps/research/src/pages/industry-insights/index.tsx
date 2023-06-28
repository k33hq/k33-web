import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const IndustryInsights: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Valuation home</h1>
    </>
  );
};

IndustryInsights.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="industry-reports"
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {page}
    </TabLayout>
  );
};

export default IndustryInsights;
