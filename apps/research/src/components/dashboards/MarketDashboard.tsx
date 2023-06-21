import * as React from 'react';
import NamedDivider from '../platform/NamedDivider';
import OutlookCard from './OutlookCard';
import MarketCombinedSummary from './MarketCombinedSummary';
import { ArticleSummaryWidget, ArticleSummaryWithCover } from '@/types';

// TODO: gets 1 weekly report
// TODO: gets 3 latest quick takes
// TODO: has monthly outlook message from vetle

interface MarketDashboardProps {
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

const MarketDashboard: React.FC<MarketDashboardProps> = ({
  quickTakes,
  reports,
}) => {
  return (
    <div id="market-dashboard-summary">
      <NamedDivider label="Market Insights" />
      <MarketCombinedSummary quickTakes={quickTakes} reports={reports} />
      <OutlookCard />
    </div>
  );
};

export default MarketDashboard;
