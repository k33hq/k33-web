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
import { NextPageWithLayout } from 'platform-js';
import { NextSeo, ArticleJsonLd } from 'next-seo';
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
    articleSlug,
    article: { authorsCollection, tagsCollection, ...articleContent },
  } = page;
  const { productId, pricesCollection } = product;
  const { seo: pageSeo, article, title } = seo;

  return (
    <>
      <NextSeo
        title={title}
        description={pageSeo ? pageSeo.description : article.subtitle}
        twitter={{
          handle: '@K33HQ',
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'twitter:card',
        }}
        openGraph={{
          title: title,
          description: pageSeo ? pageSeo.description : article.subtitle,
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`,
          type: 'article',
          article: {
            publishedTime: publishedDate,
            authors: authorsCollection.items.map((author) => author.name),
            tags: tagsCollection.items.map((tag) => tag.title),
          },
          images: [
            {
              url: pageSeo ? pageSeo.image.url : articleContent.image.url,
              alt: pageSeo
                ? pageSeo.image.description
                : articleContent.image.description,
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
      />
      <ArticleJsonLd
        useAppDir={false}
        url={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
        title={article.title}
        images={[articleContent.image.url]}
        datePublished={publishedDate}
        dateModified={publishedDate}
        authorName={authorsCollection.items.map((author) => ({
          name: author.name,
          title: author.title,
        }))}
        publisherName="K33 Research"
        publisherLogo={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/favicon-64x64.png`}
        description={pageSeo ? pageSeo.description : article.subtitle!}
        isAccessibleForFree={false}
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
  return (
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
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
