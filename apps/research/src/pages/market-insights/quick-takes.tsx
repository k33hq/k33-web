import { getArticleWebWidgets } from '@/api';
import { ArticleWidget, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

interface QuickTakesProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const QuickTakes: NextPageWithLayout<QuickTakesProps> = ({ articles }) => {
  return (
    <>
      <NextSeo title="Market Insights - Quick Takes" />
      <Row wrap gutter={[32, 40]}>
        {articles.map((article) => (
          <ArticleWidget key={article.publishedDate} {...article} />
        ))}
      </Row>
    </>
  );
};

QuickTakes.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="quick-takes"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<QuickTakesProps> = async () => {
  const articles = await getArticleWebWidgets('market-insights/quick-takes');
  return {
    props: {
      articles,
    },
  };
};

export default QuickTakes;
