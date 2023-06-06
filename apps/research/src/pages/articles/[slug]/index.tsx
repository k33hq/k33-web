import { getArticlePage, getArticleSeo, getArticleSlugs } from '@/api';
import type { ArticlePage, ArticleSeo } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Layout, Row, Col } from 'antd';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';
import { NextSeo } from 'next-seo';
import { ArticleBodyLayout } from '@/components';

const { Content } = Layout;

interface ArticlePageProps {
  seo: ArticleSeo;
  page: ArticlePage;
}

const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({ page, seo }) => {
  return (
    <>
      <ArticleBodyLayout />
    </>
  );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Content
        style={{
          maxWidth: 1440,
        }}
      >
        <Row>
          <Col span={22} offset={1}>
            {page}
          </Col>
        </Row>
      </Content>
    </Content>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getArticleSlugs();
  const paths = slugs.map(({ articleSlug }) => ({
    params: { slug: articleSlug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

// TODO: error fallback
export const getStaticProps: GetStaticProps<ArticlePageProps> = async (
  context
) => {
  const slug = context.params!.slug as string;
  const page = await getArticlePage(slug);
  const seo = await getArticleSeo(slug);
  return {
    props: {
      page,
      seo,
    },
  };
};

export default ArticlePage;
