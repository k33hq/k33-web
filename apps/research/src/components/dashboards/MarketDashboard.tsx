import * as React from 'react';
import NamedDivider from '../platform/NamedDivider';
import OutlookCard from './OutlookCard';
import MarketCombinedSummary from './MarketCombinedSummary';
import { ArticleSummaryWidget, ArticleSummaryWithCover } from '@/types';
import styles from './styles.module.scss';

interface MarketDashboardProps {
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

const MarketDashboard: React.FC<MarketDashboardProps> = ({
  quickTakes,
  reports,
}) => {
  return (
    <>
      <MarketCombinedSummary quickTakes={quickTakes} reports={reports} />
      <OutlookCard />
    </>
  );
};

export default MarketDashboard;
