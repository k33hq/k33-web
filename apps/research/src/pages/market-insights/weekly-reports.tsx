import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const WeeklyReports: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Research - Market Insights" />
      <h1>weekly reports</h1>
    </>
  );
};

WeeklyReports.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="weekly-reports"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export default WeeklyReports;
