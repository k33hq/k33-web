import * as React from 'react';
import { NextPageWithLayout } from 'ui';
import {
  HomeDashboard,
  IndustryDashboard,
  MarketDashboard,
  SimpleLayout,
  TokenDashboard,
} from '@/components';
import { NextSeo } from 'next-seo';
import { BuilderComponent, builder } from '@builder.io/react';
import { GetStaticProps } from 'next';
import {
  ArticleSummaryWidget,
  ArticleSummaryWithCover,
  ArticleWebWidget,
  HomePage,
} from '@/types';
import {
  getArticleSummaryWidgets,
  getArticleSummaryWithCoverWidgets,
  getArticleWebWidgets,
  getHomePage,
} from '@/api';

builder.init(process.env.BUILDER_API_KEY!);

interface HomePageProps {
  industryReports: ReadonlyArray<ArticleWebWidget>;
  analysis: ReadonlyArray<ArticleSummaryWidget>;
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
  homePage: HomePage;
}

const Home: NextPageWithLayout<HomePageProps> = ({
  industryReports,
  analysis,
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
  return (
    <>
      <NextSeo
        title={title}
        defaultTitle="K33 - Research"
        description={description}
        twitter={{
          cardType: '',
        }}
      />
      <main id="research-home" className="research-home">
        <HomeDashboard {...articles} />
        <MarketDashboard quickTakes={quickTakes} reports={reports} />
        <TokenDashboard articles={analysis} />
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
    4
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

  const homePage = await getHomePage();

  // api call
  return {
    props: {
      industryReports,
      analysis,
      quickTakes,
      reports,
      homePage,
    },
  };
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
