import { getIndexes } from '@/api';
import {
  HighlightArticle,
  SpotlightChart,
  TokenValuationCover,
  TokenValuationLayout,
} from '@/components';
import { IndexHome } from '@/types';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndexesProps {
  indexes: ReadonlyArray<IndexHome>;
}

const Indexes: NextPageWithLayout<IndexesProps> = ({ indexes }) => {
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
  return {
    props: {
      indexes,
    },
  };
};

export default Indexes;
