import { getArticleWebWidgets } from '@/api';
import { IndustryInsightsLayout, ReportCard, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Grid, Row, Col } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndustryReportsProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const IndustryReports: NextPageWithLayout<IndustryReportsProps> = ({
  articles,
}) => {
  const { sm } = Grid.useBreakpoint();
  return (
    <>
      <NextSeo />
      <Row wrap gutter={[sm ? 32 : 16, 40]} align="stretch">
        {articles.map((report) => (
          <Col xs={12} sm={12} md={6} xxl={4} key={report.articleSlug}>
            <ReportCard {...report} />
          </Col>
        ))}
      </Row>
    </>
  );
};

IndustryReports.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <IndustryInsightsLayout activeKey="industry-reports">
      {page}
    </IndustryInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryReportsProps
> = async () => {
  const articles = await getArticleWebWidgets('industry-insights/reports');
  return {
    props: {
      articles,
    },
  };
};

export default IndustryReports;
