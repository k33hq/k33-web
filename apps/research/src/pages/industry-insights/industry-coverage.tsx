import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const IndustryCoverage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Industry Coverage</h1>
    </>
  );
};

IndustryCoverage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="industry-coverage"
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {page}
    </TabLayout>
  );
};

export default IndustryCoverage;
