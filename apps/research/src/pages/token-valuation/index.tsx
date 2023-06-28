import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

const TokenValuation: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Valuation home</h1>
    </>
  );
};

TokenValuation.getLayout = function getLayout(page: React.ReactElement) {
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

export default TokenValuation;
