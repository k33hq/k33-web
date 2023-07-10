import {
  getArticleSummaryWidgets,
  getArticleSummaryWithCoverWidgets,
} from '@/api';
import { MarketDashboard, MarketInsightsLayout } from '@/components';
import { ArticleSummaryWidget, ArticleSummaryWithCover } from '@/types';
import { siteUsername } from '@/utils';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface MarketInsightsProps {
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

const MarketInsights: NextPageWithLayout<MarketInsightsProps> = ({
  quickTakes,
  reports,
}) => {
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Market Insights'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Market Insights',
          description:
            "Stay ahead of the curve in the digital assets market with our comprehensive market insights. Discover the latest trends and factors influencing prices for tomorrow's gains.",
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/market-insights`,
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
      <MarketDashboard quickTakes={quickTakes} reports={reports} />
    </>
  );
};

MarketInsights.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MarketInsightsLayout activeKey="/market-insights">
      {page}
    </MarketInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<MarketInsightsProps> = async () => {
  const quickTakes = await getArticleSummaryWidgets(
    'market-insights/quick-takes',
    3
  );

  const reports = await getArticleSummaryWithCoverWidgets(
    'market-insights/weekly-reports',
    5
  );
  return {
    props: {
      quickTakes,
      reports,
    },
  };
};

export default MarketInsights;
