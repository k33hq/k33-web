import { ArticleWebWidget } from '@/types';
import * as React from 'react';
import { ReportCard } from '../../article';
import { Col, Grid, Row } from 'antd';

import { SectionHeader } from '@/components';

const { useBreakpoint } = Grid;

interface LatestIndustryReportsProps {
  reports: ReadonlyArray<ArticleWebWidget>;
  hideTitle?: boolean;
  columns?: number;
  smallScreen?: number;
}

const LatestIndustryReports: React.FC<LatestIndustryReportsProps> = ({
  reports,
  hideTitle = true,
  smallScreen,
  columns = 4,
}) => {
  const { xl } = useBreakpoint();
  const getReports = () => {
    if (!smallScreen || xl) {
      return reports.map((report) => (
        <Col xs={12} sm={12} md={4} lg={columns} key={report.articleSlug}>
          <ReportCard {...report} />
        </Col>
      ));
    }
    return reports.slice(0, smallScreen).map((report) => (
      <Col xs={12} sm={12} md={6} key={report.articleSlug}>
        <ReportCard {...report} />
      </Col>
    ));
  };

  return (
    <div
      id="industry-reports-dashboard-summary"
      className="dashboard-article-summary"
    >
      {hideTitle ? null : (
        <SectionHeader
          title="Industry Reports"
          href="/industry-insights/industry-reports"
        />
      )}
      <Row
        align="stretch"
        style={{
          marginTop: 16,
        }}
        gutter={[
          { xs: 16, sm: 16, md: 16, lg: 16, xl: 24 },
          { xs: 56, sm: 40 },
        ]}
      >
        {getReports()}
      </Row>
    </div>
  );
};

export default LatestIndustryReports;
