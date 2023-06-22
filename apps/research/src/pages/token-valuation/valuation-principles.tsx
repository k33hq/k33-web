import { ReportCard, TabLayout, ValuationPrinciple } from '@/components';
import { getLevelTwos, getPageData } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';

import { GetStaticProps } from 'next';
import { Typography, Image, Row, Col, Divider, Grid, Anchor } from 'antd';
import { getArticleWebWidgets } from '@/api';
import { ArticleWebWidget } from '@/types';

interface PrinciplesProps {
  articles: ReadonlyArray<ArticleWebWidget>;
  principles: {
    page: string;
    content: string;
    frontmatter: {
      [key: string]: any;
    };
  };
}

const { Paragraph, Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Principles: NextPageWithLayout<PrinciplesProps> = ({
  articles,
  principles,
}) => {
  const { sm, xl } = useBreakpoint();

  return (
    <>
      <NextSeo title="Research - Token Valuation Principles" />
      <Row align="top" gutter={[16, 32]}>
        <Col xs={0} lg={24} xl={6}>
          <Anchor
            affix={xl ?? true}
            direction={xl ? 'vertical' : 'horizontal'}
            showInkInFixed
            offsetTop={64}
            items={[
              {
                key: '1',
                href: '#valuation-header',
                title: 'A Framework for Evaluating Token Prices',
              },
              {
                key: '2',
                href: '#defining-the-three-components',
                title:
                  'Defining the three components of a fundamental token price:',
                children: [
                  {
                    key: '3',
                    href: '#store-value',
                    title: '1. The store of value component',
                  },
                  {
                    key: '4',
                    href: '#exchange-medium',
                    title: '2. The medium of exchange function',
                  },
                  {
                    key: '5',
                    href: '#access-utility',
                    title: '3. Access utility.',
                  },
                ],
              },
            ]}
          />
        </Col>
        <Col xs={24} xl={16}>
          <ValuationPrinciple />
        </Col>
      </Row>
      <div
        id="token-valuation-applying-framework"
        style={{
          marginTop: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          width: '100%',
        }}
      >
        <div
          id="token-valuation-report-header"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: '100%',
          }}
        >
          <Text strong>Applying the Framework</Text>
          <Divider style={{ margin: 0 }} />
        </div>
        <Row wrap gutter={[sm ? 32 : 16, 40]}>
          {articles.map((report) => (
            <Col xs={12} sm={12} md={6} xxl={4} key={report.articleSlug}>
              <ReportCard {...report} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

Principles.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="valuation-principles"
      title="Token Valuation"
      tabs={getLevelTwos('token-valuation')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<PrinciplesProps> = async () => {
  const principles = await getPageData('token_valuation_principles');
  const articles = await getArticleWebWidgets('token-valuation/principles');
  return {
    props: {
      principles,
      articles,
    },
  };
};

export default Principles;
