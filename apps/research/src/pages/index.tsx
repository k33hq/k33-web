import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import {
  BottomPromotion,
  DashboardList,
  HomeDashboard,
  IndustryDashboard,
  MarketDashboard,
  NamedDivider,
  PricingTable,
  ProPricingTable,
  SimpleLayout,
  TokenValuationCover,
  TopPromotion,
} from '@/components';
import { NextSeo } from 'next-seo';
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
import { Button, Divider, Grid, Image, Typography } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';

interface HomePageProps {
  industryReports: ReadonlyArray<ArticleWebWidget>;
  analysis: ReadonlyArray<ArticleSummaryWidget>;

  indexSummary: ReadonlyArray<TokenValuationIndex>;
  homePage: HomePage;
}

const Home: NextPageWithLayout<HomePageProps> = ({
  industryReports,
  analysis,
  indexSummary,

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
  const { lg, xl } = Grid.useBreakpoint();

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
        <BottomPromotion />
        <HomeDashboard {...articles} />
        <IndustryDashboard reports={industryReports} />
        <div id="token-dashboard-summary" className="home-section-summary">
          <NamedDivider label="KVQ" />
          <TokenValuationCover {...indexTableProps}>
            <DashboardList
              articles={analysis}
              title="Analysis"
              column={12}
              href="/articles?query=kvq"
            />
          </TokenValuationCover>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <Divider />
          <ProPricingTable />
        </div>
        {/* <div
          style={{
            width: '100%',

            ...(lg
              ? {
                  backgroundImage: `url(/research/bottom_promotion.svg)`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                }
              : {
                  backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/research/bottom_promotion.svg)`,
                  backgroundSize: 'cover',
                }),
          }}
          className={styles.bottomPromotion}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              ...(lg && {
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 100,
                margin: 'auto 0',
                width: 467,
                gap: 32,
              }),
            }}
          >
            <Typography.Title
              style={{
                opacity: 0.85,
                textAlign: 'center',
                margin: 0,
              }}
            >
              Explore Our Newest Products!
            </Typography.Title>
            <Typography.Text style={{ opacity: 0.85, textAlign: 'center' }}>
              Nice text Nice text Nice text Nice text Nice text Nice text Nice
              text Nice text Nice text Nice text Nice text Nice text Nice text
              Nice text Nice text Nice text Nice text Nice text Nice text
            </Typography.Text>
            <Button size="large">Know More</Button>
          </div>
        </div> */}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // const homepage = await builder.get('homepage').toPromise();
  const industryReports = await getArticleWidgets('industry-reports', 6);
  const analysis = await getArticleSummaryWidgets('kvq', 4);

  // const quickTakes = await getArticleSummaryWidgets(
  //   'market-insights/quick-takes',
  //   3
  // );

  // const reports = await getArticleSummaryWithCoverWidgets(
  //   'market-insights/weekly-reports',
  //   5
  // );

  const indexSummary = await getIndexSummary();

  const homePage = await getHomePage();

  // api call
  return {
    props: {
      industryReports,
      analysis,

      indexSummary,
      homePage,
    },
  };
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
