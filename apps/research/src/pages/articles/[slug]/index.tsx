import {
  getArticlePage,
  getArticleSeo,
  getArticleSlugs,
  getProducts,
} from '@/api';
import type { ArticlePage, ArticleSeo, SubscriptionProduct } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Layout, Row, Col, Grid, theme } from 'antd';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';
import { NextSeo } from 'next-seo';
import { Article, ArticleSidebar, ShareArticle } from '@/components';

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { useToken } = theme;

interface ArticlePageProps {
  seo: ArticleSeo;
  page: ArticlePage;
  product: SubscriptionProduct;
}

const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({
  page,
  seo,
  product,
}) => {
  const { lg } = useBreakpoint();
  const {
    section,
    publishedDate,
    article: { authorsCollection, tagsCollection, ...articleContent },
  } = page;
  const { productId, pricesCollection } = product;
  const { seo: pageSeo, article, title } = seo;

  return (
    <>
      <NextSeo
        title={title}
        description={pageSeo ? pageSeo.description : article.subtitle}
      />
      <Row gutter={{ xs: 40, lg: 50 }} className="article-layout">
        <Col xs={24} lg={6} order={lg ? 0 : 2} className="article-sidebar">
          <ArticleSidebar
            authors={authorsCollection.items}
            tags={tagsCollection.items}
          />
        </Col>
        <Col id="article" xs={24} lg={14} className="article">
          <Article
            {...articleContent}
            section={section}
            publishedDate={publishedDate}
            productId={productId}
            priceId={pricesCollection.items[0].stripeProductId}
          />
          <ShareArticle title={articleContent.title} />
        </Col>
        <Col xs={0} lg={2}></Col>
      </Row>
    </>
  );
};

ArticlePage.getLayout = function getLayout(
  page: ReactElement
): React.ReactNode {
  const {
    token: { colorBgContainer },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useToken();
  return (
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: colorBgContainer,
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
  const product = await getProducts();
  return {
    props: {
      page,
      product,
      seo,
    },
  };
};

export default ArticlePage;
