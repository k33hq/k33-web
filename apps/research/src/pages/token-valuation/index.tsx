import { getArticleSummaryWidgets, getIndexSummary } from '@/api';
import {
  DashboardList,
  TokenValuationCover,
  TokenValuationLayout,
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
  const kvqProps = indexSummary[0];

  return (
    <>
      <NextSeo
        title="Research - Token Valuation"
        description="Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential."
      />
      <TokenValuationCover {...kvqProps}>
        <DashboardList
          articles={analysis}
          title="Analysis"
          column={12}
          href="/token-valuation/analysis"
        />
      </TokenValuationCover>
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
