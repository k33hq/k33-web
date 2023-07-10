import { getArticleWebWidgets } from '@/api';
import { MarketInsightsLayout, ReportCard } from '@/components';
import { ArticleWebWidget } from '@/types';
import { siteUsername } from '@/utils';
import { Grid, Row, Col } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface WeeklyReportsProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const WeeklyReports: NextPageWithLayout<WeeklyReportsProps> = ({
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
        title={'Research - Market Insights Weekly Reports'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Market Insights Weekly Reports',
          description:
            "Stay ahead of the curve in the digital assets market with our comprehensive market insights. Discover the latest trends and factors influencing prices for tomorrow's gains.",
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/market-insights/weekly-reports`,
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

WeeklyReports.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MarketInsightsLayout activeKey="/market-insights/weekly-reports">
      {page}
    </MarketInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<WeeklyReportsProps> = async () => {
  const articles = await getArticleWebWidgets('market-insights/weekly-reports');
  return {
    props: {
      articles,
    },
  };
};

export default WeeklyReports;
