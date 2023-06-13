import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const Analysis: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Analysis</h1>
    </>
  );
};

Analysis.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="analysis"
      title="Token Valuation"
      tabs={getLevelTwos('token-valuation')}
    >
      {page}
    </TabLayout>
  );
};

export default Analysis;
