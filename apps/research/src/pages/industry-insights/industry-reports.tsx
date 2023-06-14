import { getArticleWebWidgets } from '@/api';
import { ReportWidget, TabLayout } from '@/components';
import { ArticleWebWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Grid, Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

interface IndustryReportsProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const IndustryReports: NextPageWithLayout<IndustryReportsProps> = ({
  articles,
}) => {
  const { sm } = Grid.useBreakpoint();
  return (
    <>
      <NextSeo />
      <Row wrap gutter={[sm ? 32 : 16, 40]}>
        {articles.map((article) => (
          <ReportWidget key={article.publishedDate} {...article} />
        ))}
      </Row>
    </>
  );
};

IndustryReports.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="industry-reports"
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryReportsProps
> = async () => {
  const articles = await getArticleWebWidgets('industry-insights/reports');
  return {
    props: {
      articles,
    },
  };
};

export default IndustryReports;
