import { ReportWidget, TabLayout } from '@/components';
import { getLevelTwos, getPageData } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';
import ReactMarkdown from 'react-markdown';
import { GetStaticProps } from 'next';
import { Typography, Image, Row, Col, Divider, Grid } from 'antd';
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
  principles: { page, content, frontmatter },
}) => {
  const { sm } = useBreakpoint();
  return (
    <>
      <NextSeo title="Research - Token Valuation Principles" />
      <Row align="middle">
        <Col xs={0} xl={4}></Col>
        <Col xs={24} xl={16}>
          <div
            id="valuation-principles"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <ReactMarkdown
              components={{
                img: function (props) {
                  return (
                    <div
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      <Image src={props.src} alt={props.alt} />
                    </div>
                  );
                },
                h1: ({ node, children, ...props }) => (
                  <Title level={2}>{children}</Title>
                ),
                h3: ({ node, children, ...props }) => (
                  <Title level={3} type="secondary">
                    {children}
                  </Title>
                ),
                p: ({ node, children, ...props }) => {
                  return <Paragraph>{children}</Paragraph>;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </Col>
        <Col xs={0} xl={4}></Col>
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
          {articles.map((article) => (
            <ReportWidget key={article.publishedDate} {...article} />
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
