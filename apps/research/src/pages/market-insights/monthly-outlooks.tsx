import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const MontlyOutlooks: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Research - Market Insights" />
      <h1>monthly outlooks</h1>
    </>
  );
};

MontlyOutlooks.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="monthly-outlooks"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export default MontlyOutlooks;
