import { SectionDescriptionHeader, TokenValuationLayout } from '@/components';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface TokenValuationProps {}

const TokenValuation: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo />
      <div id="index-cover-dashboard" className="half">
        <div id="k33-vinter-index-tables" className="stack">
          <SectionDescriptionHeader
            name="K33 Vinter Quality Index"
            description="The K33 Vinter Quality Index is a smart beta index for crypto assets, consisting of an equally weighted mix of selected tokens from the top 30 crypto assets."
            href="/token-valuation/indexes"
          />
          {/* <KVQTable
            tokens={selectedTokensCollection.items}
            {...tableResource}
          /> */}
        </div>
        <div
          id="charts-and-hightlighted-articles"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 32,
          }}
        ></div>
      </div>
    </>
  );
};

TokenValuation.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TokenValuationLayout activeKey="/token-valuation">
      {page}
    </TokenValuationLayout>
  );
};

export const getStaticProps: GetStaticProps<TokenValuationProps> = async () => {
  return {
    props: {},
  };
};

export default TokenValuation;
