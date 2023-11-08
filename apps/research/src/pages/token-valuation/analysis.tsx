import { getArticleSummaryWidgets } from '@/api';
import { ArticleCard, TabLayout, TokenValuationLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { siteUsername } from '@/utils';
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
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Token Valuation Analysis'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Token Valuation Analysis',
          description:
            'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/token-valuation/analysis`,
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
