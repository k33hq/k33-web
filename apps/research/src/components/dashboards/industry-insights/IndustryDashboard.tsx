import * as React from 'react';
import { ArticleWebWidget } from '@/types';
import { Divider, Result, Typography } from 'antd';
import LatestIndustryReports from './LatestIndustryReports';
import Link from 'next/link';

// TODO: 4 industry report section reports

const { Link: AntLink, Title } = Typography;
interface IndustryDashboardProps {
  reports: ReadonlyArray<ArticleWebWidget>;
}

const IndustryDashboard: React.FC<IndustryDashboardProps> = ({ reports }) => {
  return (
    <div
      id="industry-insight-dashboard-summary"
      className="home-section-summary"
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Title level={4}>Industry Reports</Title>
          <Link href={'/industry-reports'}>
            <AntLink underline>See More</AntLink>
          </Link>
        </div>
        <Divider style={{ margin: 0 }} />
      </div>

      <LatestIndustryReports reports={reports} />
    </div>
  );
};

export default IndustryDashboard;
