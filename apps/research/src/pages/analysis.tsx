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
        title={'Research - Analysis'}
        description={''}
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - analysis',
          description: '',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/analysis`,
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
      sectionName={'analysis'}
      activeKey="/"
      description=""
      title="Analysis"
      tabs={[]}
      image="./aoc_header.svg"
      showSubscribeButton
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<
  NavigatingNarrativesProps
> = async () => {
  const articles = await getArticleSummaryWidgets('analysis');
  return {
    props: {
      articles,
    },
  };
};

export default NavigatingNarratives;
