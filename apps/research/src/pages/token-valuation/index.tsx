import { getArticleSummaryWidgets, getIndexSummary } from '@/api';
import {
  DashboardList,
  TokenValuationCover,
  TokenValuationLayout,
  ValuationPrincipleWidget,
} from '@/components';
import { ArticleSummaryWidget, TokenValuationIndex } from '@/types';
import { siteUsername } from '@/utils';
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
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Token Valuation'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Token Valuation',
          description:
            'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/token-valuation`,
          type: 'article:section',
          images: [
            {
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/3bw9VhMe8k8aI66rUAsGuR/8885288dd10032e9c5bbd287c69b3dd8/Cover_image_research__5_.png?h=250',
              alt: 'k33-logo',
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
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
