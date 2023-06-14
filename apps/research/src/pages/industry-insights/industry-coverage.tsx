import { getArticleSummaryWidgets } from '@/api';
import { ArticleWidget, TabLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { Row } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

interface IndustryCoverageProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const IndustryCoverage: NextPageWithLayout<IndustryCoverageProps> = ({
  articles,
}) => {
  return (
    <>
      <NextSeo />
      <Row wrap gutter={[32, 56]}>
        {articles.map((article, index) => (
          <ArticleWidget key={article.publishedDate} {...article} showTags />
        ))}
      </Row>
    </>
  );
};

IndustryCoverage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="industry-coverage"
      title="Industry Insights"
      tabs={getLevelTwos('industry-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<
  IndustryCoverageProps
> = async () => {
  const articles = await getArticleSummaryWidgets('industry-insights/coverage');
  return {
    props: {
      articles,
    },
  };
};

export default IndustryCoverage;
