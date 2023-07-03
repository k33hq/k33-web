import { IndustryInsightsLayout } from '@/components';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

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
    <IndustryInsightsLayout activeKey="home">{page}</IndustryInsightsLayout>
  );
};

export default IndustryInsights;
