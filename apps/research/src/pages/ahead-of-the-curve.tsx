import { getArticleWidgets } from '@/api';
import { ReportCard, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { siteUsername } from '@/utils';
import { Grid, Row, Col } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface AheadOfTheCurveProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

// TODO: change SEO data
const AheadOfTheCurve: NextPageWithLayout<AheadOfTheCurveProps> = ({
  articles,
}) => {
  const { md } = Grid.useBreakpoint();
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Ahead Of The Curve'}
        description={
          'The weekly market report with signals from the derivatives market, market structure and expert opinion. Delivered directly to your inbox.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Ahead Of The Curve',
          description:
            'The weekly market report with signals from the derivatives market, market structure and expert opinion. Delivered directly to your inbox.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/ahead-of-the-curve`,
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
      <Row wrap gutter={[md ? 32 : 16, 40]} align="stretch">
        {articles.map((report) => (
          <Col xs={12} sm={12} md={6} xxl={4} key={report.articleSlug}>
            <ReportCard {...report} />
          </Col>
        ))}
      </Row>
    </>
  );
};

AheadOfTheCurve.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey={'/'}
      sectionName={'ahead-of-the-curve'}
      description="Signals from the derivatives market, market structure and expert opinion."
      title="Ahead of the Curve"
      tabs={[]}
      showSubscribeButton
      image="./aoc_header.avif"
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<
  AheadOfTheCurveProps
> = async () => {
  const articles = await getArticleWidgets('ahead-of-the-curve');
  return {
    props: {
      articles,
    },
  };
};

export default AheadOfTheCurve;
