import { getArticleWidgets } from '@/api';
import { ReportCard, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { siteUsername } from '@/utils';
import { Grid, Row, Col } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndustryReportsProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const IndustryReports: NextPageWithLayout<IndustryReportsProps> = ({
  articles,
}) => {
  const { sm } = Grid.useBreakpoint();
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Industry Insights Reports'}
        description={
          'Our collection of in-depth reports on various crypto topics from the last five years.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Industry Insights Reports',
          description:
            'Our collection of in-depth reports on various crypto topics from the last five years.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/industry-insights/industry-reports`,
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
      <Row wrap gutter={[sm ? 32 : 16, 40]} align="stretch">
        {articles.map((report) => (
          <Col xs={12} sm={12} md={6} xxl={4} key={report.articleSlug}>
            <ReportCard {...report} />
          </Col>
        ))}
      </Row>
    </>
  );
};

IndustryReports.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey={'/'}
      description="Our collection of in-depth reports on various crypto topics"
      title="Industry Reports"
      tabs={[]}
      image="./ir_header.svg"
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryReportsProps
> = async () => {
  const articles = await getArticleWidgets('industry-reports');
  return {
    props: {
      articles,
    },
  };
};

export default IndustryReports;
