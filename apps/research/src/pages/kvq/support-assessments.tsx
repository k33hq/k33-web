import { getArticleSummaryWidgets } from '@/api';
import { ArticleCard, TabLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { siteUsername } from '@/utils';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface KvQProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}
const title = 'Research - Support Assessments';
const Kvq: NextPageWithLayout<KvQProps> = ({ articles }) => {
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={title}
        description={
          'The K33 Vinter Quality Index is a smart beta index for crypto assets, consisting of an equally weighted mix of selected tokens from the top 30 crypto assets.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title,
          description:
            'The K33 Vinter Quality Index is a smart beta index for crypto assets, consisting of an equally weighted mix of selected tokens from the top 30 crypto assets.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/token-valuation`,
          type: 'article:section',
          images: [
            {
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/6JyAj2lOiLECBkMbdcd7R0/b5cf2d56571af27c3e8b882169c59764/socialPreview.svg?fm=png&w=1200&h=621',
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

Kvq.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey={'/'}
      description="Our smart beta index, a selection of the top 30 crypto assets"
      title="K33 Vinter Quality Index"
      tabs={[]}
      image={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/kvq_header.svg`}
    >
      {page}
    </TabLayout>
  );
};
export const getStaticProps: GetStaticProps<KvQProps> = async () => {
  const articles = await getArticleSummaryWidgets('kvq');
  return {
    props: {
      articles,
    },
  };
};

export default Kvq;
