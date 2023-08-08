import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import {
  DashboardList,
  HomeDashboard,
  IndustryDashboard,
  MarketDashboard,
  NamedDivider,
  SimpleLayout,
  TokenValuationCover,
} from '@/components';
import { NextSeo } from 'next-seo';
import { BuilderComponent, builder } from '@builder.io/react';
import { GetStaticProps } from 'next';
import {
  ArticleSummaryWidget,
  ArticleSummaryWithCover,
  ArticleWebWidget,
  HomePage,
  TokenValuationIndex,
} from '@/types';
import {
  getArticleSummaryWidgets,
  getArticleSummaryWithCoverWidgets,
  getArticleWidgets,
  getHomePage,
  getIndexSummary,
} from '@/api';
import { siteUsername } from '@/utils';

builder.init(process.env.BUILDER_API_KEY!);

interface HomePageProps {
  industryReports: ReadonlyArray<ArticleWebWidget>;
  analysis: ReadonlyArray<ArticleSummaryWidget>;
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
  indexSummary: ReadonlyArray<TokenValuationIndex>;
  homePage: HomePage;
}

const Home: NextPageWithLayout<HomePageProps> = ({
  industryReports,
  analysis,
  indexSummary,
  quickTakes,
  reports,
  homePage: {
    seo: {
      title,
      description,
      image: { url, ...seoImage },
    },
    ...articles
  },
}) => {
  const indexTableProps = indexSummary[0];

  return (
    <>
      <NextSeo
        themeColor="#000000"
        defaultTitle="K33 - Research"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={title}
        description={description}
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: title,
          description: description,
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research`,
          type: 'website',
          images: [
            {
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/3bw9VhMe8k8aI66rUAsGuR/8885288dd10032e9c5bbd287c69b3dd8/Cover_image_research__5_.png?h=250',
              alt: 'k33-logo',
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
      />
      <main id="research-home" className="research-home">
        <HomeDashboard {...articles} />
        <div id="market-dashboard-summary" className="home-section-summary">
          <NamedDivider label="Market Insights" />
          <MarketDashboard quickTakes={quickTakes} reports={reports} />
        </div>
        <div id="token-dashboard-summary" className="home-section-summary">
          <NamedDivider label="Token Valuation" />
          <TokenValuationCover {...indexTableProps}>
            <DashboardList
              articles={analysis}
              title="Analysis"
              column={12}
              href="/token-valuation/analysis"
            />
          </TokenValuationCover>
        </div>
        <IndustryDashboard reports={industryReports} />
      </main>

      {/* <BuilderComponent model="homepage" content={homepage} /> */}
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // const homepage = await builder.get('homepage').toPromise();
  const industryReports = await getArticleWidgets(
    'industry-insights/reports',
    6
  );
  const analysis = await getArticleSummaryWidgets(
    'token-valuation/analysis',
    4
  );

  const quickTakes = await getArticleSummaryWidgets(
    'market-insights/quick-takes',
    3
  );

  const reports = await getArticleSummaryWithCoverWidgets(
    'market-insights/weekly-reports',
    5
  );

  const indexSummary = await getIndexSummary();

  const homePage = await getHomePage();

  // api call
  return {
    props: {
      industryReports,
      analysis,
      quickTakes,
      reports,
      indexSummary,
      homePage,
    },
  };
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
