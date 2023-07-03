import {
  getArticleSummaryWidgets,
  getArticleSummaryWithCoverWidgets,
} from '@/api';
import { MarketDashboard, MarketInsightsLayout } from '@/components';
import { ArticleSummaryWidget, ArticleSummaryWithCover } from '@/types';
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
      <NextSeo title="Research - Market Insights" />
      <MarketDashboard quickTakes={quickTakes} reports={reports} />
    </>
  );
};

MarketInsights.getLayout = function getLayout(page: React.ReactElement) {
  return <MarketInsightsLayout activeKey="home">{page}</MarketInsightsLayout>;
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
