import { TabLayout } from '@/components';
import { getLevelTwos } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const Principles: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <h1>Valuation Principles</h1>
    </>
  );
};

Principles.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="valuation-principles"
      title="Token Valuation"
      tabs={getLevelTwos('token-valuation')}
    >
      {page}
    </TabLayout>
  );
};

export default Principles;
