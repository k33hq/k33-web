import * as React from 'react';
import NamedDivider from '../platform/NamedDivider';
import { ArticleWebWidget } from '@/types';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import { Divider, Result, Typography } from 'antd';
import LatestIndustryReports from './LatestIndustryReports';
import Link from 'next/link';

const ClientCarousel = dynamic(
  () => import('../article/article-widgets/ReportCarousel'),
  { ssr: false, loading: () => <h1>loading</h1> }
);

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
          <Link href={'/industry-insights/industry-reports'}>
            <AntLink underline>See More</AntLink>
          </Link>
        </div>
        <Divider style={{ margin: 0 }} />
      </div>

      {/* <ErrorBoundary
        fallback={
          <Result
            status="404"
            title="Industry Report Did not load"
            subTitle="Sorry, something went wrong."
          />
        }
      >
        <ClientCarousel reports={reports} />
      </ErrorBoundary> */}
      <LatestIndustryReports reports={reports} />
    </div>
  );
};

export default IndustryDashboard;
