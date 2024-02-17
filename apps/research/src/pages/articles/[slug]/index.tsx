import {
  getArticlePage,
  getArticleSlugs,
  getArticleWidgetsByAuthors,
} from '@/api';
import type { ArticlePage, ArticleWebWidget } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Layout, Row, Col, Grid } from 'antd';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'platform-js';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { Article } from '@/components';
import Head from 'next/head';
import { siteUsername } from '@/utils';

import dynamic from 'next/dynamic';

const ArticleRecommendations = dynamic(
  () =>
    import('../../../components/article/article-body/ArticleRecommendation'),
  {
    loading: () => <div style={{ width: '100%', height: 150 }}></div>,
  }
);

const ArticleSidebar = dynamic(
  () => import('../../../components/article/article-sidebar/ArticleSidebar'),
  {
    loading: () => <div style={{ width: '100%', height: 200 }}></div>,
  }
);

const ShareArticle = dynamic(
  () => import('../../../components/article/ShareArticle'),
  {
    loading: () => <div style={{ width: '100%', height: 200 }}></div>,
  }
);

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface ArticlePageProps {
  page: ArticlePage;
  authorArticles: readonly ArticleWebWidget[];
}

const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({
  page,
  authorArticles,
}) => {
  const { lg } = useBreakpoint();
  const {
    title,
    subtitle,
    seo,
    publishedDate,
    articleSlug,
    authorsCollection,
    tagsCollection,
    relatedArticlesCollection,
    recommendedArticlesCollection,
    image,
    ...articleContent
  } = page;

  return (
    <>
      <Head>
        <meta name="twitter:site" content={siteUsername} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={seo ? seo.description : subtitle}
        />
        <meta name="twitter:image" content={seo ? seo.image.url : image.url} />
      </Head>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={title}
        description={seo ? seo.description : subtitle}
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: title,
          description: seo ? seo.description : subtitle,
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`,
          type: 'article',
          article: {
            publishedTime: publishedDate,
            authors: authorsCollection.items.map((author) => author.name),
            tags: tagsCollection.items.map((tag) => tag.title),
          },
          images: [
            {
              url: seo ? seo.image.url : image.url,
              alt: seo ? seo.image.description : image.description,
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
      />
      <ArticleJsonLd
        useAppDir={false}
        url={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
        title={title}
        images={[image.url]}
        datePublished={publishedDate}
        dateModified={publishedDate}
        authorName={authorsCollection.items.map((author) => ({
          name: author.name,
          title: author.title,
        }))}
        publisherName="K33 Research"
        publisherLogo={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/favicon-64x64.png`}
        description={seo ? seo.description : subtitle!}
        isAccessibleForFree={false}
      />
      <Row
        gutter={{ xs: 40, lg: 50 }}
        className="article-layout"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <Col xs={24} lg={6} order={lg ? 0 : 2} className="article-sidebar">
          <ArticleSidebar
            authors={authorsCollection.items}
            tags={tagsCollection.items}
            authorArticles={authorArticles}
          />
        </Col>
        <Col id="article" xs={24} lg={14} className="article">
          <Article
            title={title}
            subtitle={subtitle}
            articleSlug={articleSlug}
            image={image}
            publishedDate={publishedDate}
            {...articleContent}
          />
          <ShareArticle title={title} />
        </Col>
        <Col xs={0} lg={2}></Col>
      </Row>
      <Row>
        <Col xs={0} lg={6} order={lg ? 0 : 2}></Col>
        <Col id="article" xs={22} lg={14}>
          <ArticleRecommendations
            relatedArticlesCollection={relatedArticlesCollection}
            recommendedArticlesCollection={recommendedArticlesCollection}
          />
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
  const paths = slugs
    .filter(({ articleSlug }) => articleSlug)
    .map(({ articleSlug }) => ({
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
  const authorArticles = await getArticleWidgetsByAuthors(
    page.authorsCollection.items.map((author) => author.name),
    slug
  );
  return {
    props: {
      page,
      authorArticles,
    },
  };
};

export default ArticlePage;
