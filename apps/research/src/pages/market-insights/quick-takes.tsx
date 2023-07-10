import { getArticleWebWidgets } from '@/api';
import { ArticleCard, MarketInsightsLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { siteUsername } from '@/utils';
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
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Market Insights Quick Takes'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Market Insights Quick Takes',
          description:
            "Stay ahead of the curve in the digital assets market with our comprehensive market insights. Discover the latest trends and factors influencing prices for tomorrow's gains.",
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/market-insights/quick-takes`,
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
