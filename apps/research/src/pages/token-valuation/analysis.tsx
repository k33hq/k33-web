import { TabLayout } from '@/components';
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
      title="Token Valuation"
      tabs={[
        { key: 'analysis', label: 'Analysis' },
        { key: 'principles', label: 'Principles' },
      ]}
    >
      {page}
    </TabLayout>
  );
};

export default Analysis;
