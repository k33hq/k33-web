import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const News: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>news</h1>
    </>
  );
};

News.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="news"
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {page}
    </TabLayout>
  );
};

export default News;
