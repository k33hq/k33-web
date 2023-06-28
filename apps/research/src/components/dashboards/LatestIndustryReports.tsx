import { ArticleWebWidget } from '@/types';
import * as React from 'react';
import { ArticleCard, ReportCard } from '../article';
import { Col, Divider, Grid, Row, Typography } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';

const { Text, Link: AntLink } = Typography;
const { useBreakpoint } = Grid;

interface LatestIndustryReportsProps {
  reports: ReadonlyArray<ArticleWebWidget>;
}

const LatestIndustryReports: React.FC<LatestIndustryReportsProps> = ({
  reports,
}) => {
  return (
    <div
      id="industry-reports-dashboard-summary"
      className={styles.analysisSummary}
    >
      {/* <div id="analysis-header" className={styles.anlysisHeader}>
        <div id="analysis-title" className={styles.sectionHeader}>
          <Text strong>Industry Reports</Text>
          <Link href={'/industry-insights/industry-reports'}>
            <AntLink underline>See More</AntLink>
          </Link>
        </div>
        <Divider style={{ margin: 0 }} />
      </div> */}
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
        {reports.map((report) => (
          <Col xs={12} sm={12} md={4} lg={4} key={report.articleSlug}>
            <ReportCard {...report} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LatestIndustryReports;
