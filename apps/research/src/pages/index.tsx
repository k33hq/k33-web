import * as React from 'react';
import { NextPageWithLayout } from 'ui';
import {
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
} from '@/types';
import {
  getArticleSummaryWidgets,
  getArticleSummaryWithCoverWidgets,
  getArticleWebWidgets,
} from '@/api';
import Head from 'next/head';

builder.init(process.env.BUILDER_API_KEY!);

interface HomePageProps {
  industryReports: ReadonlyArray<ArticleWebWidget>;
  analysis: ReadonlyArray<ArticleSummaryWidget>;
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

const Home: NextPageWithLayout<HomePageProps> = ({
  industryReports,
  analysis,
  quickTakes,
  reports,
}) => {
  return (
    <>
      <NextSeo title="K33 - Research" />
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <main id="research-home">
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
    5
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

  // api call
  return {
    props: {
      industryReports,
      analysis,
      quickTakes,
      reports,
    },
  };
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
