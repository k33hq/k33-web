import { getArchivedArticle, getArchivedPageSlugs } from '@/api';
import type { ArchivePage } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Layout, Row, Col, Grid, theme } from 'antd';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { Article, ArticleSidebar, ShareArticle } from '@/components';

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { useToken } = theme;

interface ArticlePageProps {
  page: ArchivePage;
}

const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({ page }) => {
  const { lg } = useBreakpoint();
  const {
    title: ArticleTitle,
    slug,
    seo: { title, description },
    content: { tagsCollection, image, publishDate, authorsCollection },
  } = page;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        twitter={{
          handle: '@K33HQ',
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'twitter:card',
        }}
        openGraph={{
          title: title,
          description: description,
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${slug}`,
          type: 'article',
          article: {
            publishedTime: publishDate,
            authors: authorsCollection.items.map((author) => author.name),
            tags: tagsCollection.items.map((tag) => tag.name),
          },
          images: [
            {
              url: image.url,
              alt: image.title,
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
      />
      <ArticleJsonLd
        useAppDir={false}
        url={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${slug}`}
        title={ArticleTitle}
        images={[image.url]}
        datePublished={publishDate}
        dateModified={publishDate}
        authorName={authorsCollection.items.map((author) => ({
          name: author.name,
          title: author.title,
        }))}
        publisherName="K33 Research"
        publisherLogo={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/favicon-64x64.png`}
        description={description}
        isAccessibleForFree={true}
      />
      <Row gutter={{ xs: 40, lg: 50 }} className="article-layout">
        <Col xs={24} lg={6} order={lg ? 0 : 2} className="article-sidebar">
          <ArticleSidebar
            authors={authorsCollection.items}
            tags={tagsCollection.items}
          />
        </Col>
        <Col id="article" xs={24} lg={14} className="article">
          <Article {...page} />
          <ShareArticle title={ArticleTitle} />
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
  const slugs = await getArchivedPageSlugs();
  const paths = slugs.map(({ slug }) => ({
    params: { slug },
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
  const page = await getArchivedArticle(slug);
  return {
    props: {
      page,
    },
  };
};

export default ArticlePage;
