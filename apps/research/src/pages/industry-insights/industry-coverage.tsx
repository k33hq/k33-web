import { getArticleSummaryWidgets } from '@/api';
import { ArticleCard, TabLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndustryCoverageProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const IndustryCoverage: NextPageWithLayout<IndustryCoverageProps> = ({
  articles,
}) => {
  return (
    <>
      <NextSeo />
      <Row wrap gutter={[32, 56]} align="stretch">
        {articles.map((article, index) => (
          <Col xs={24} sm={24} md={6} key={article.publishedDate}>
            <ArticleCard {...article} showTags />
          </Col>
        ))}
      </Row>
    </>
  );
};

IndustryCoverage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="industry-coverage"
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryCoverageProps
> = async () => {
  const articles = await getArticleSummaryWidgets('industry-insights/coverage');
  return {
    props: {
      articles,
    },
  };
};

export default IndustryCoverage;
