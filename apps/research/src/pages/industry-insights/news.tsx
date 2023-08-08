import { getArticleSummaryWidgets, getNews } from '@/api';
import {
  ArticleCard,
  IndustryInsightsLayout,
  News as NewsComponent,
} from '@/components';
import { ArticleSummaryWidget, News } from '@/types';
import { siteUsername } from '@/utils';
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
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Industry Insights News'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Industry Insights News',
          description:
            'Gain a competitive edge in the dynamic digital assets industry. Stay informed about the latest trends and news shaping the future landscape while navigating its intricate landscape with our expert industry insights.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/industry-insights/news`,
          type: 'article:section',
          images: [
            {
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/3bw9VhMe8k8aI66rUAsGuR/8885288dd10032e9c5bbd287c69b3dd8/Cover_image_research__5_.png?h=250',
              alt: 'k33-logo',
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
      />
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
