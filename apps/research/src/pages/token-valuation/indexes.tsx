import { getIndexes } from '@/api';
import { KVQTable, TokenValuationLayout } from '@/components';
import { IndexHome, IndexToken } from '@/types';
import { Divider, Typography } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'platform-js';

interface IndexesProps {
  indexes: ReadonlyArray<IndexHome>;
}

const { Text } = Typography;

const Indexes: NextPageWithLayout<IndexesProps> = ({ indexes }) => {
  const {
    name,
    slug,
    description,
    selectedTokensCollection,
    highlightArticle,
    chart,
    ...tableResource
  } = indexes[0];

  return (
    <>
      <NextSeo />
      <div id="index-cover-dashboard">
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
