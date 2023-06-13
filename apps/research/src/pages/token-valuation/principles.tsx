import { TabLayout } from '@/components';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const Principles: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Principles</h1>
    </>
  );
};

Principles.getLayout = function getLayout(page: React.ReactElement) {
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

export default Principles;
