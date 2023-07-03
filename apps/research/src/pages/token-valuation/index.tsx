import { TokenValuationLayout } from '@/components';
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
  return <TokenValuationLayout activeKey="home">{page}</TokenValuationLayout>;
};

export default TokenValuation;
