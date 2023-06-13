import { getArticleWebWidgets } from '@/api';
import { ReportWidget, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

interface WeeklyReportsProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const WeeklyReports: NextPageWithLayout<WeeklyReportsProps> = ({
  articles,
}) => {
  return (
    <>
      <NextSeo title="Market Insights - Weekly Reports" />
      <Row wrap gutter={[16, 40]}>
        {articles.map((article) => (
          <ReportWidget key={article.publishedDate} {...article} />
        ))}
      </Row>
    </>
  );
};

WeeklyReports.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="weekly-reports"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<WeeklyReportsProps> = async () => {
  const articles = await getArticleWebWidgets('market-insights/weekly-reports');
  return {
    props: {
      articles,
    },
  };
};

export default WeeklyReports;
