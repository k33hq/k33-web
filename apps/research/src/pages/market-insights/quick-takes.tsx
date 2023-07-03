import { getArticleWebWidgets } from '@/api';
import { ArticleCard, MarketInsightsLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

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
    <MarketInsightsLayout activeKey="/market-insights/quick-takes">
      {page}
    </MarketInsightsLayout>
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
