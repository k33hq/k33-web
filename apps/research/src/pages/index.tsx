import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import {
  DashboardList,
  HomeDashboard,
  IndustryDashboard,
  MarketDashboard,
  NamedDivider,
  SimpleLayout,
  TokenDashboard,
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
  getArticleWebWidgets,
  getHomePage,
  getIndexSummary,
} from '@/api';

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
        title={title}
        defaultTitle="K33 - Research"
        description={description}
        twitter={{
          handle: '@K33HQ',
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'twitter:card',
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
  const industryReports = await getArticleWebWidgets(
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
