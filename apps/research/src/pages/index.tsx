import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import {
  BottomPromotion,
  //DashboardList,
  //HomeDashboard,
  //IndustryDashboard,
  //MarketDashboard,
  NamedDivider,
  // ProPricingTable,
  SimpleLayout,
  TokenValuationCover,
} from '@/components';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import {
  ArticleSummaryWidget,
  ArticleWebWidget,
  HomePage,
  TokenValuationIndex,
} from '@/types';
import {
  getArticleSummaryWidgets,
  getArticleWidgets,
  getHomePage,
  getIndexSummary,
} from '@/api';
import { siteUsername } from '@/utils';
import { Divider, Grid } from 'antd';
import { useProductInfo } from '@/hooks';
import { appStructure } from '@/config';
import dynamic from 'next/dynamic';

const HomeDashboard = dynamic(
  () => import('../components/dashboards/HomeDashboard'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const IndustryDashboard = dynamic(
  () => import('../components/dashboards/industry-insights/IndustryDashboard'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ProPricingTable = dynamic(
  () => import('../components/platform/ProPricingTable'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const DashboardList = dynamic(
  () => import('../components/article/article-widgets/DashboardList'),
  {
    loading: () => <p>Loading...</p>,
  }
);

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
  const { productStatus: proProductStatus, appState } = useProductInfo(
    appStructure.payments.pro.productId
  );

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
        {proProductStatus.state !== 'active' && <BottomPromotion />}
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
            width: '100%',
            gap: 32,
          }}
        >
          <Divider />
          <ProPricingTable />
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const industryReports = await getArticleWidgets('industry-reports', 6);
  const analysis = await getArticleSummaryWidgets('kvq', 4);
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
