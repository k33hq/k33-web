import { getIndexes } from '@/api';
import {
  HighlightArticle,
  KVQTable,
  SpotlightChart,
  TokenValuationLayout,
} from '@/components';
import { IndexHome } from '@/types';
import { Divider, Grid, Typography, theme } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndexesProps {
  indexes: ReadonlyArray<IndexHome>;
}

const { Text } = Typography;
const { useToken } = theme;

const Indexes: NextPageWithLayout<IndexesProps> = ({ indexes }) => {
  const {
    name,
    slug,
    description,
    selectedTokensCollection,
    highlightArticle,
    chartBody,
    chart,
    ...tableResource
  } = indexes[0];

  const {
    token: { fontSizeSM },
  } = useToken();

  return (
    <>
      <NextSeo />
      <div id="index-cover-dashboard" className="half">
        <div id="k33-vinter-index-tables" className="stack">
          <div id="k33-vinter-index-table-description" className="stack">
            <Text strong>{name}</Text>
            <Text strong type="secondary">
              {description}
            </Text>
            <Divider style={{ margin: 0 }} />
          </div>
          <KVQTable
            tokens={selectedTokensCollection.items}
            {...tableResource}
          />
        </div>
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
      </div>
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
