import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const QuickTakes: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Research - Market Insights" />
      <h1>quick takes</h1>
    </>
  );
};

QuickTakes.getLayout = function getLayout(page: React.ReactElement) {
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

export default QuickTakes;
