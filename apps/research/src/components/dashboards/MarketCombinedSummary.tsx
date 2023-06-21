import * as React from 'react';
import QuickTakesLatest from './QuickTakesLatest';
import type { ArticleSummaryWidget, ArticleSummaryWithCover } from '@/types';
import LatestReport from './LatestReport';
import { Col, Row } from 'antd';

interface MarketCombinedSummaryProps {
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

const MarketCombinedSummary: React.FC<MarketCombinedSummaryProps> = ({
  quickTakes,
  reports,
}) => {
  return (
    <Row wrap align="middle" gutter={24}>
      <Col xs={24} md={12}>
        <LatestReport reports={reports} />
      </Col>
      <Col xs={24} md={12}>
        <QuickTakesLatest quickTakes={quickTakes} />
      </Col>
    </Row>
  );
};

export default MarketCombinedSummary;
