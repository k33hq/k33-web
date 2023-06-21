import { getArticleSummaryWidgets } from '@/api';
import { ArticleCard, TabLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Col, Divider, Row, Typography } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

const { Text } = Typography;

interface NewsProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const News: NextPageWithLayout<NewsProps> = ({ articles }) => {
  return (
    <>
      <NextSeo />
      <div
        id="news-header"
        style={{
          width: '100%',
        }}
      >
        <Text strong>Past Weekly Highlights</Text>
        <Divider />
      </div>
      <Row wrap gutter={[32, 56]}>
        {articles.map((article, index) => (
          <Col xs={24} sm={24} md={6} key={article.publishedDate}>
            <ArticleCard {...article} />
          </Col>
        ))}
      </Row>
    </>
  );
};

News.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="news"
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const articles = await getArticleSummaryWidgets('industry-insights/news');
  return {
    props: {
      articles,
    },
  };
};

export default News;
