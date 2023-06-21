import * as React from 'react';
import QuickTakesLatest from './QuickTakesLatest';
import type { ArticleSummaryWidget, ArticleSummaryWithCover } from '@/types';
import { Col, Row, Result, Skeleton, Card } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import dynamic from 'next/dynamic';

const Reports = dynamic(() => import('./LatestReport'), {
  ssr: false,
  loading: () => (
    <Card
      loading
      style={{
        width: '100%',
        height: 400,
      }}
    />
  ),
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
    <Row wrap align="stretch" gutter={[24, 48]}>
      <Col xs={24} md={12}>
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
      </Col>
      <Col xs={24} md={12}>
        <QuickTakesLatest quickTakes={quickTakes} />
      </Col>
    </Row>
  );
};

export default MarketCombinedSummary;
