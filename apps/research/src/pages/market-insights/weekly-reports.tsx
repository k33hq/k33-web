import { getArticleWebWidgets } from '@/api';
import { ReportCard, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Grid, Row, Col } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

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
    <TabLayout
      activeKey="weekly-reports"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
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
