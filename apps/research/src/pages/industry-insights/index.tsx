import { getArticleSummaryWidgets, getArticleWebWidgets, getNews } from '@/api';
import {
  ArticleCard,
  DashboardList,
  IndustryInsightsLayout,
  LatestIndustryReports,
  News as NewsComponent,
  SectionHeader,
} from '@/components';
import { ArticleSummaryWidget, ArticleWebWidget, News } from '@/types';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndustryInsightsProps {
  reports: ReadonlyArray<ArticleWebWidget>;
  coverage: ReadonlyArray<ArticleSummaryWidget>;
  news: News;
}

const IndustryInsights: NextPageWithLayout<IndustryInsightsProps> = ({
  reports,
  coverage,
  news,
}) => {
  return (
    <>
      <NextSeo title="Research - Industry Insights" />
      <div id="industry-news-and-latest-reports" className="divide-equal">
        <div
          id="latest-reports"
          style={{
            flex: 2,
          }}
        >
          <LatestIndustryReports
            reports={reports}
            hideTitle={false}
            columns={8}
            smallScreen={4}
          />
        </div>
        <div
          id="news"
          style={{
            flex: 1,
          }}
        >
          <NewsComponent news={news} />
        </div>
      </div>
      <DashboardList
        articles={coverage}
        title="Industry Coverage"
        href="/industry-insights/industry-coverage"
      />
    </>
  );
};

IndustryInsights.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <IndustryInsightsLayout activeKey="/industry-insights">
      {page}
    </IndustryInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryInsightsProps
> = async () => {
  const reports = await getArticleWebWidgets('industry-insights/reports', 6);

  const coverage = await getArticleSummaryWidgets(
    'industry-insights/coverage',
    5
  );

  const news = await getNews();

  return {
    props: {
      reports,
      coverage,
      news,
    },
  };
};

export default IndustryInsights;
