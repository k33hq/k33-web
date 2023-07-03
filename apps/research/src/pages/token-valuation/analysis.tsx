import { getArticleSummaryWidgets } from '@/api';
import { ArticleCard, TabLayout, TokenValuationLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface AnalysisProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const Analysis: NextPageWithLayout<AnalysisProps> = ({ articles }) => {
  return (
    <>
      <NextSeo />
      <Row wrap gutter={[32, 48]} align="stretch">
        {articles.map((article) => (
          <Col xs={24} sm={24} md={6} key={article.publishedDate}>
            <ArticleCard {...article} />
          </Col>
        ))}
      </Row>
    </>
  );
};

Analysis.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TokenValuationLayout activeKey="/token-valuation/analysis">
      {page}
    </TokenValuationLayout>
  );
};

export const getStaticProps: GetStaticProps<AnalysisProps> = async () => {
  const articles = await getArticleSummaryWidgets('token-valuation/analysis');
  return {
    props: {
      articles,
    },
  };
};

export default Analysis;
