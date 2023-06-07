import { getArticlePage, getArticleSeo, getArticleSlugs } from '@/api';
import type { ArticlePage, ArticleSeo } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Layout, Row, Col, Grid, Divider } from 'antd';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';
import { NextSeo } from 'next-seo';
import {
  Article,
  ArticleMetaData,
  ArticleSidebar,
  ShareArticle,
} from '@/components';

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface ArticlePageProps {
  seo: ArticleSeo;
  page: ArticlePage;
}

const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({ page, seo }) => {
  const { lg } = useBreakpoint();
  const {
    section,
    publishedDate,
    article: { authorsCollection, tagsCollection, ...articleContent },
  } = page;
  return (
    <>
      <NextSeo />
      <Row gutter={{ xs: 40, lg: 50 }} className="article-layout">
        <Col xs={24} lg={6} order={lg ? 0 : 2} className="article-sidebar">
          <ArticleSidebar
            authors={page.article.authorsCollection.items}
            tags={page.article.tagsCollection.items}
          />
        </Col>
        <Col id="article" xs={24} lg={14} className="article">
          <Article
            {...articleContent}
            section={section}
            publishedDate={publishedDate}
          />
          <ShareArticle title={articleContent.title} />
        </Col>
        <Col xs={0} lg={2}></Col>
      </Row>
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