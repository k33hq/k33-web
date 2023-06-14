import { getArticleSummaryWidgets } from '@/api';
import { ArticleSummary, TabLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

interface MontlyOutlooksProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const MontlyOutlooks: NextPageWithLayout<MontlyOutlooksProps> = ({
  articles,
}) => {
  return (
    <>
      <NextSeo title="Research - Market Insights" />
      <Row wrap gutter={[16, 40]}>
        {articles.map((article, index) => (
          <ArticleSummary
            key={article.publishedDate}
            {...article}
            isNew={index === 0 ? true : false}
          />
        ))}
      </Row>
    </>
  );
};

MontlyOutlooks.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="monthly-outlooks"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<MontlyOutlooksProps> = async () => {
  const articles = await getArticleSummaryWidgets(
    'market-insights/monthly-outlook'
  );
  return {
    props: {
      articles,
    },
  };
};

export default MontlyOutlooks;
