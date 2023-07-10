import { getArticleWebWidgets } from '@/api';
import { IndustryInsightsLayout, ReportCard, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { getLevelTwos, siteUsername } from '@/utils';
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
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Industry Insights Reports',
          description:
            'Gain a competitive edge in the dynamic digital assets industry. Stay informed about the latest trends and news shaping the future landscape while navigating its intricate landscape with our expert industry insights.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/industry-insights/industry-reports`,
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
    <IndustryInsightsLayout activeKey="/industry-insights/industry-reports">
      {page}
    </IndustryInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryReportsProps
> = async () => {
  const articles = await getArticleWebWidgets('industry-insights/reports');
  return {
    props: {
      articles,
    },
  };
};

export default IndustryReports;
