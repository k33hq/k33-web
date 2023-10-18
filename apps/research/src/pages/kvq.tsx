import { getArticleSummaryWidgets, getIndexes } from '@/api';
import {
  DashboardList,
  HighlightArticle,
  SpotlightChart,
  TokenValuationCover,
  TabLayout,
  TokenValuationLayout,
} from '@/components';
import { ArticleSummaryWidget, IndexHome } from '@/types';
import { siteUsername } from '@/utils';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface KvQProps {
  indexes: ReadonlyArray<IndexHome>;
  summaries: ReadonlyArray<ArticleSummaryWidget>;
}

const Kvq: NextPageWithLayout<KvQProps> = ({ indexes, summaries }) => {
  const { highlightArticle, chartBody, chart, ...indexProps } = indexes[0];
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Token Valuation'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Token Valuation',
          description:
            'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/token-valuation`,
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
      <TokenValuationCover {...indexProps} isNavigable={false}>
        <div
          id="charts-and-hightlighted-articles"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 32,
          }}
        >
          <SpotlightChart chart={chart} chartBody={chartBody} />
          <HighlightArticle {...highlightArticle} />
        </div>
      </TokenValuationCover>
      <DashboardList
        articles={summaries}
        title="Support Assessments"
        column={6}
        href="/token-valuation/analysis"
      />
    </>
  );
};

Kvq.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey={'/'}
      description="Stay ahead of the curve in the digital assets market with our comprehensive market insights. Discover the latest trends and factors influencing prices for tomorrow's gains."
      title="K33 Vinter Quality Index"
      tabs={[]}
      image="./kvq_header.svg"
    >
      {page}
    </TabLayout>
  );
};
export const getStaticProps: GetStaticProps<KvQProps> = async () => {
  const indexes = await getIndexes();

  const summaries = await getArticleSummaryWidgets(
    'token-valuation/indices/kvq',
    4
  );
  return {
    props: {
      indexes,
      summaries,
    },
  };
};

export default Kvq;
