import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import Typography from 'antd/es/typography/Typography';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const IndustryReports: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Industry Reports</h1>
    </>
  );
};

IndustryReports.getLayout = function getLayout(page: React.ReactElement) {
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

export default IndustryReports;
