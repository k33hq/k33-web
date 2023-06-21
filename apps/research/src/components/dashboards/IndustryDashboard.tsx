import * as React from 'react';
import NamedDivider from '../platform/NamedDivider';
import { ArticleWebWidget } from '@/types';
import { ReportCarousel } from '../article';
import dynamic from 'next/dynamic';

const ClientCarousel = dynamic(
  () => import('../article/article-widgets/ReportCarousel'),
  { ssr: false }
);

// TODO: 4 industry report section reports

interface IndustryDashboardProps {
  reports: ReadonlyArray<ArticleWebWidget>;
}

const IndustryDashboard: React.FC<IndustryDashboardProps> = ({ reports }) => {
  return (
    <div id="industry-insight-dashboard-summary">
      <NamedDivider label="Industry Insights " />
      <ClientCarousel reports={reports} />
    </div>
  );
};

export default IndustryDashboard;
