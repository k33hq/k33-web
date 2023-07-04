import { getArticleSummaryWidgets, getIndexSummary } from '@/api';
import {
  DashboardList,
  KVQTable,
  SectionDescriptionHeader,
  SectionHeader,
  TokenValuationLayout,
  ValuationPrinciple,
  ValuationPrincipleWidget,
} from '@/components';
import { ArticleSummaryWidget, TokenValuationIndex } from '@/types';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface TokenValuationProps {
  indexSummary: ReadonlyArray<TokenValuationIndex>;
  analysis: ReadonlyArray<ArticleSummaryWidget>;
}

const TokenValuation: NextPageWithLayout<TokenValuationProps> = ({
  indexSummary,
  analysis,
}) => {
  const {
    name,
    slug,
    selectedTokensCollection,
    description,
    ...tableResource
  } = indexSummary[0];

  return (
    <>
      <NextSeo />
      <div id="index-cover-dashboard" className="half">
        <div id="k33-vinter-index-tables" className="stack">
          <SectionDescriptionHeader
            name={name}
            description={description}
            href="/token-valuation/indexes"
          />
          <KVQTable
            tokens={selectedTokensCollection.items}
            {...tableResource}
          />
        </div>
        <div
          id="charts-and-hightlighted-articles"
          style={{
            width: '100%',
          }}
        >
          <DashboardList
            articles={analysis}
            title="Analysis"
            column={12}
            href="/token-valuation/analysis"
          />
        </div>
      </div>
      <ValuationPrincipleWidget />
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
  const analysis = await getArticleSummaryWidgets(
    'token-valuation/analysis',
    4
  );
  const indexSummary = await getIndexSummary();
  return {
    props: {
      analysis,
      indexSummary,
    },
  };
};

export default TokenValuation;
