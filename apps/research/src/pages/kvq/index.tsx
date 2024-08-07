import { getArticleSummaryWidgets, getIndexes } from '@/api';
import {
  //DashboardList,
  HighlightArticle,
  SpotlightChart,
  TokenValuationCover,
  TabLayout,
} from '@/components';
import { ArticleSummaryWidget, IndexHome } from '@/types';
import { siteUsername } from '@/utils';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';
import dynamic from 'next/dynamic';

const DashboardList = dynamic(
  () => import('../../components/article/article-widgets/DashboardList'),
  {
    loading: () => <p>Loading...</p>,
  }
);

interface KvQProps {
  indexes: ReadonlyArray<IndexHome>;
  summaries: ReadonlyArray<ArticleSummaryWidget>;
}

const title = 'Research - KVQ';
const Kvq: NextPageWithLayout<KvQProps> = ({ indexes, summaries }) => {
  const { highlightArticle, chartBody, chart, ...indexProps } = indexes[0];
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={title}
        description={
          'The K33 Vinter Quality Index is a smart beta index for crypto assets, consisting of an equally weighted mix of selected tokens from the top 30 crypto assets.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title,
          description:
            'The K33 Vinter Quality Index is a smart beta index for crypto assets, consisting of an equally weighted mix of selected tokens from the top 30 crypto assets.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/token-valuation`,
          type: 'article:section',
          images: [
            {
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/6JyAj2lOiLECBkMbdcd7R0/b5cf2d56571af27c3e8b882169c59764/socialPreview.svg?fm=png&w=1200&h=621',
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
        href="/kvq/support-assessments"
      />
    </>
  );
};

Kvq.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey={'/'}
      description="Our smart beta index, a selection of the top 30 crypto assets"
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

  const summaries = await getArticleSummaryWidgets('kvq', 4);
  return {
    props: {
      indexes,
      summaries,
    },
  };
};

export default Kvq;
