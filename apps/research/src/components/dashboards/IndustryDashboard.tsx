import * as React from 'react';
import NamedDivider from '../platform/NamedDivider';
import { ArticleWebWidget } from '@/types';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import { Result } from 'antd';
import LatestIndustryReports from './LatestIndustryReports';

const ClientCarousel = dynamic(
  () => import('../article/article-widgets/ReportCarousel'),
  { ssr: false, loading: () => <h1>loading</h1> }
);

// TODO: 4 industry report section reports

interface IndustryDashboardProps {
  reports: ReadonlyArray<ArticleWebWidget>;
}

const IndustryDashboard: React.FC<IndustryDashboardProps> = ({ reports }) => {
  return (
    <div
      id="industry-insight-dashboard-summary"
      className="home-section-summary"
    >
      <NamedDivider label="Industry Insights " />

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
