import * as React from 'react';
import QuickTakesLatest from './QuickTakesLatest';
import type { ArticleSummaryWidget, ArticleSummaryWithCover } from '@/types';
import { Col, Row, Result, Skeleton, Card, Grid } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import dynamic from 'next/dynamic';
import styles from './styles.module.scss';

const Reports = dynamic(() => import('./LatestReport'), {
  ssr: false,
  loading: () => <Card loading />,
});

interface MarketCombinedSummaryProps {
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

const MarketCombinedSummary: React.FC<MarketCombinedSummaryProps> = ({
  quickTakes,
  reports,
}) => {
  return (
    <div className={styles.marketCombined}>
      <div>
        <ErrorBoundary
          fallback={
            <Result
              status="404"
              title="This Section Stopped Working"
              subTitle="Sorry, something went wrong."
            />
          }
        >
          <Reports reports={reports} />
        </ErrorBoundary>
      </div>
      <div>
        <QuickTakesLatest quickTakes={quickTakes} />
      </div>
    </div>
  );
};

export default MarketCombinedSummary;
