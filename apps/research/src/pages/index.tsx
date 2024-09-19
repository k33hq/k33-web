import * as React from 'react';
import { NextPageWithLayout } from 'platform-js';
import { BottomPromotion, HomeDashboard, SimpleLayout } from '@/components';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import { ArticleWebWidget, HomePage } from '@/types';
import { getArticleWidgets, getHomePage } from '@/api';
import { siteUsername } from '@/utils';
import { Divider } from 'antd';
import { useProductInfo } from '@/hooks';
import { appStructure } from '@/config';
import dynamic from 'next/dynamic';

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
  homePage: HomePage;
}

const Home: NextPageWithLayout<HomePageProps> = ({
  industryReports,
  homePage: {
    seo: {
      title,
      description,
      image: { url, ...seoImage },
    },
    ...articles
  },
}) => {
  const { productStatus: proProductStatus } = useProductInfo(
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
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/6JyAj2lOiLECBkMbdcd7R0/b5cf2d56571af27c3e8b882169c59764/socialPreview.svg?fm=png&w=1200&h=621',
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
  const homePage = await getHomePage();

  // api call
  return {
    props: {
      industryReports,
      homePage,
    },
  };
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
