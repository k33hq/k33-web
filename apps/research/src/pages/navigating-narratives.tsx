import { getArticleSummaryWidgets } from '@/api';
import { ArticleCard, TabLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { siteUsername } from '@/utils';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface NavigatingNarrativesProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

// TODO: change SEO data
const NavigatingNarratives: NextPageWithLayout<NavigatingNarrativesProps> = ({
  articles,
}) => {
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Navigating Narratives'}
        description={
          'Weekly research note looking at what’s brewing in the dynamic low-mid cap altcoin markets from an altcoin trader’s perspective.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Navigating Narratives',
          description:
            'Weekly research note looking at what’s brewing in the dynamic low-mid cap altcoin markets from an altcoin trader’s perspective.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/navigating-narratives`,
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
            <ArticleCard {...article} />
          </Col>
        ))}
      </Row>
    </>
  );
};

NavigatingNarratives.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      sectionName={'navigating-narratives'}
      activeKey="/"
      description="Understand what’s brewing in the dynamic altcoin and DeFi markets"
      title="Navigating Narratives"
      tabs={[]}
      image="./nn_header.avif"
      showSubscribeButton
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<
  NavigatingNarrativesProps
> = async () => {
  const articles = await getArticleSummaryWidgets('navigating-narratives');
  return {
    props: {
      articles,
    },
  };
};

export default NavigatingNarratives;
