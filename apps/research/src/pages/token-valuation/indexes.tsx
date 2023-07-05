import { getArticleSummaryWidgets, getIndexes } from '@/api';
import {
  DashboardList,
  HighlightArticle,
  SpotlightChart,
  TokenValuationCover,
  TokenValuationLayout,
} from '@/components';
import { ArticleSummaryWidget, IndexHome } from '@/types';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndexesProps {
  indexes: ReadonlyArray<IndexHome>;
  summaries: ReadonlyArray<ArticleSummaryWidget>;
}

const Indexes: NextPageWithLayout<IndexesProps> = ({ indexes, summaries }) => {
  const { highlightArticle, chartBody, chart, ...indexProps } = indexes[0];

  return (
    <>
      <NextSeo />
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

Indexes.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TokenValuationLayout activeKey="/token-valuation/indexes">
      {page}
    </TokenValuationLayout>
  );
};

export const getStaticProps: GetStaticProps<IndexesProps> = async () => {
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

export default Indexes;
