import { getArticleWebWidgets } from '@/api';
import { ArticleCard, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

interface QuickTakesProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const QuickTakes: NextPageWithLayout<QuickTakesProps> = ({ articles }) => {
  return (
    <>
      <NextSeo title="Market Insights - Quick Takes" />
      <Row wrap gutter={[32, 40]} align="stretch">
        {articles.map((article) => (
          <Col xs={24} sm={24} md={6} key={article.publishedDate}>
            <ArticleCard {...article} showTags />
          </Col>
        ))}
      </Row>
    </>
  );
};

QuickTakes.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="quick-takes"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<QuickTakesProps> = async () => {
  const articles = await getArticleWebWidgets('market-insights/quick-takes');
  return {
    props: {
      articles,
    },
  };
};

export default QuickTakes;
