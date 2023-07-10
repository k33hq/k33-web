import { getArticleSummaryWidgets, getArticleWebWidgets, getNews } from '@/api';
import {
  ArticleCard,
  DashboardList,
  IndustryInsightsLayout,
  LatestIndustryReports,
  News as NewsComponent,
  SectionHeader,
} from '@/components';
import { ArticleSummaryWidget, ArticleWebWidget, News } from '@/types';
import { siteUsername } from '@/utils';
import { Col, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndustryInsightsProps {
  reports: ReadonlyArray<ArticleWebWidget>;
  coverage: ReadonlyArray<ArticleSummaryWidget>;
  news: News;
}

const IndustryInsights: NextPageWithLayout<IndustryInsightsProps> = ({
  reports,
  coverage,
  news,
}) => {
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Industry Insights'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Industry Insights',
          description:
            'Gain a competitive edge in the dynamic digital assets industry. Stay informed about the latest trends and news shaping the future landscape while navigating its intricate landscape with our expert industry insights.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/industry-insights`,
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
      <div id="industry-news-and-latest-reports" className="divide-equal">
        <div
          id="latest-reports"
          style={{
            flex: 2,
          }}
        >
          <LatestIndustryReports
            reports={reports}
            hideTitle={false}
            columns={8}
            smallScreen={4}
          />
        </div>
        <div
          id="news"
          style={{
            flex: 1,
          }}
        >
          <NewsComponent news={news} />
        </div>
      </div>
      <DashboardList
        articles={coverage}
        title="Industry Coverage"
        href="/industry-insights/industry-coverage"
      />
    </>
  );
};

IndustryInsights.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <IndustryInsightsLayout activeKey="/industry-insights">
      {page}
    </IndustryInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryInsightsProps
> = async () => {
  const reports = await getArticleWebWidgets('industry-insights/reports', 6);

  const coverage = await getArticleSummaryWidgets(
    'industry-insights/coverage',
    5
  );

  const news = await getNews();

  return {
    props: {
      reports,
      coverage,
      news,
    },
  };
};

export default IndustryInsights;
