import { TabLayout } from '@/components';
import { getLevelTwos, getPageData } from '@/utils';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from 'ui';
import ReactMarkdown from 'react-markdown';
import { GetStaticProps } from 'next';
import { Typography, Image, Row, Col } from 'antd';

interface PrinciplesProps {
  principles: {
    page: string;
    content: string;
    frontmatter: {
      [key: string]: any;
    };
  };
}

const { Paragraph, Title } = Typography;

const Principles: NextPageWithLayout<PrinciplesProps> = ({
  principles: { page, content, frontmatter },
}) => {
  return (
    <>
      <NextSeo title="Research - Token Valuation Principles" />
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
      <Row align="middle">
        <Col xs={0} xl={4}></Col>
        <Col xs={24} xl={16}>
          {page}
        </Col>
        <Col xs={0} xl={4}></Col>
      </Row>
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<PrinciplesProps> = async () => {
  const principles = await getPageData('token_valuation_principles');
  return {
    props: {
      principles,
    },
  };
};

export default Principles;
