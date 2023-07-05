import { getArticleSummaryWidgets, getNews } from '@/api';
import {
  ArticleCard,
  IndustryInsightsLayout,
  News as NewsComponent,
} from '@/components';
import { ArticleSummaryWidget, News } from '@/types';
import { getLevelTwos } from '@/utils';
import { Col, Divider, Row, Typography } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

const { Text } = Typography;

interface NewsProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
  news: News;
}

const News: NextPageWithLayout<NewsProps> = ({ articles, news }) => {
  return (
    <>
      <NextSeo />
      <NewsComponent news={news} hideOtherStores />
      <div
        id="news-header"
        style={{
          width: '100%',
        }}
      >
        <Text strong>Past Weekly Highlights</Text>
        <Divider style={{ marginTop: 16, marginBottom: 40 }} />
        <Row wrap gutter={[32, 56]} align="stretch">
          {articles.map((article, index) => (
            <Col xs={24} sm={24} md={6} key={article.publishedDate}>
              <ArticleCard {...article} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

News.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <IndustryInsightsLayout activeKey="/industry-insights/news">
      {page}
    </IndustryInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const articles = await getArticleSummaryWidgets('industry-insights/news');
  const news = await getNews();
  return {
    props: {
      articles,
      news,
    },
  };
};

export default News;
