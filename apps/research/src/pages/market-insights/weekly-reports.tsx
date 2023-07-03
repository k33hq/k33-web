import { getArticleWebWidgets } from '@/api';
import { MarketInsightsLayout, ReportCard } from '@/components';
import { ArticleWebWidget } from '@/types';
import { Grid, Row, Col } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface WeeklyReportsProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const WeeklyReports: NextPageWithLayout<WeeklyReportsProps> = ({
  articles,
}) => {
  const { md } = Grid.useBreakpoint();
  return (
    <>
      <NextSeo title="Market Insights - Weekly Reports" />
      <Row wrap gutter={[md ? 32 : 16, 40]} align="stretch">
        {articles.map((report) => (
          <Col xs={12} sm={12} md={6} xxl={4} key={report.articleSlug}>
            <ReportCard {...report} />
          </Col>
        ))}
      </Row>
    </>
  );
};

WeeklyReports.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MarketInsightsLayout activeKey="weekly-reports">
      {page}
    </MarketInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<WeeklyReportsProps> = async () => {
  const articles = await getArticleWebWidgets('market-insights/weekly-reports');
  return {
    props: {
      articles,
    },
  };
};

export default WeeklyReports;
