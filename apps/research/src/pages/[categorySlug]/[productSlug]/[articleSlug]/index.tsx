import { getArticlePage, getArticleSlugs } from '@/api';
import { ArticlePage, SubscriberType } from '@/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getUrl, siteUsername } from '@/utils';
import {
  Indicator,
  ReportsDownload,
  NutShell,
  KeyPoints,
  ArticleTitle,
  ArticleBody,
  Profile,
} from '@/components';
import Image from 'next/image';
import { BasicButton, Divider, NextPageWithLayout, Marker, Dot } from 'ui';
import { getTitle, useAppState } from 'platform-js';
import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { PrivateLayout } from '@/layouts';
import { useStripeSubscriber } from '@/hooks';
import Head from 'next/head';
import { formatDateAndTime } from '@contentful/f36-datetime';

interface ArticleProps {
  articleSlug: string;
  categorySlug: string;
  productSlug: string;
  article: ArticlePage;
}

const Article: NextPageWithLayout<ArticleProps> = ({
  productSlug,
  categorySlug,
  article: articlePage,
  articleSlug,
}) => {
  const { article, product, publishedDate } = articlePage;
  const subscriber = useStripeSubscriber();

  const mainBody = () => {
    if (
      (subscriber != null && subscriber === 'pro') ||
      ['blog', 'analysis'].includes(categorySlug)
    ) {
      return (
        <>
          <ArticleBody document={article.body} />
          {article.reportDocument ? (
            <ReportsDownload
              url={article.reportDocument.url}
              title={article.reportDocument.title}
            />
          ) : null}
        </>
      );
    }

    return null;
  };

  const getSeo = () => {
    if (articlePage.seo)
      return (
        <>
          <>
            <meta name="description" content={articlePage.seo.description} />
            <meta
              property="og:title"
              content={articlePage.seo.title}
              key="ogtitle"
            />
            <meta
              property="og:description"
              content={articlePage.seo.description}
              key="ogdesc"
            />

            <meta property="og:image" content={articlePage.seo.image.url} />

            <meta name="twitter:title" content={articlePage.seo.title} />
            <meta
              name="twitter:description"
              content={articlePage.seo.description}
            />
            <meta name="twitter:image" content={articlePage.seo.image.url} />
          </>
        </>
      );
    return (
      <>
        <meta name="description" content={article.subtitle ?? ''} />
        <meta property="og:title" content={articlePage.title} key="ogtitle" />
        <meta
          property="og:description"
          content={article.subtitle ?? ''}
          key="ogdesc"
        />
        <meta property="og:image" content={article.image!.url} />
        <meta name="twitter:title" content={articlePage.title} />
        <meta name="twitter:description" content={article.subtitle ?? ''} />
        <meta name="twitter:image" content={article.image!.url} />
      </>
    );
  };

  return (
    <>
      <Head>
        {getSeo()}
        <title>{getTitle('Research', articlePage.title)}</title>
        <meta name="twitter:site" content={siteUsername} />
        <meta
          property="og:url"
          content={
            process.env.NEXT_PUBLIC_RESEARCH_URL +
            getUrl(categorySlug, productSlug, articleSlug)
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="article" />
        <meta name="twitter:image:alt" content={article.title} />
      </Head>
      <Indicator color={product.branding.color} />
      <section
        id="main-article-section"
        className="flex md:flex-row flex-col-reverse md:container pt-6 md:py-12 md:pt-16 md:gap-6 gap-20"
      >
        <div className="w-full md:w-1/3 bg-bg-light-secondary flex flex-col md:bg-bg-light-primary gap-4 px-6 md:px-0 py-10">
          <p className="text-body1 text-label-light-primary">Written by</p>
          {article.authorsCollection.items.map((author) => (
            <Profile {...author} key={author.name} />
          ))}
        </div>

        <article
          className={`flex flex-col justify-center md:gap-8 gap-4 md:w-2/3 w-full px-6 md:px-0`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:gap-2 gap-1">
              <div
                id="article-meta-title"
                className="flex flex-row gap-3 items-center"
              >
                <div
                  id="research-product-branding-title"
                  className="flex flex-row gap-1 items-center"
                >
                  <Marker color={product.branding.color} />
                  <Link
                    className={`font-[500] leading-4 text-[10px] md:font-[600] md:text-[24px] text-label-light-primary/60 hover:text-label-light-tertiary uppercase`}
                    href={getUrl(categorySlug, productSlug)}
                  >
                    {product.product.title}
                  </Link>
                </div>
                <Dot />
                <p className="md:text-body4 text-small text-label-light-secondary">
                  {formatDateAndTime(publishedDate, 'day')}
                </p>
              </div>
              <p className="md:text-heading7 text-heading8 text-label-light-primary">
                {article.title}
              </p>
            </div>
            {article.subtitle && (
              <p className="md:text-body2 text-small  md:text-label-light-primary text-label-light-secondary">
                {article.subtitle}
              </p>
            )}
          </div>
          <Divider />
          <div className="pt-4 md:pt-0 pb-2 md:pb-0">
            <NutShell document={article.summary} />
          </div>
          <KeyPoints points={article.keyPoints} />
          <Divider />
          <div className="w-full h-64 md:h-[423px] relative">
            {article.image ? (
              <Image
                src={article.image.url}
                fill
                style={{
                  objectFit: 'contain',
                }}
                alt={article.image.description}
              />
            ) : null}
          </div>

          {mainBody()}
          {(subscriber === null || subscriber === 'free') && (
            <div
              id="id-subscribe"
              className="bg-bg-dark-elevated-primary flex flex-col items-center justify-center text-center content-center md:py-16 py-8 md:px-24 px-10 md:gap-6 gap-2"
            >
              <p className="md:text-heading7 text-body1 text-label-dark-primary">
                Sign in to K33 Research Pro to download the report
              </p>
              <Link
                href={getUrl(
                  'subscription',
                  'professional-k33-research-subscription'
                )}
              >
                <BasicButton variant="secondary">
                  Start 30 Day Free Trial
                </BasicButton>
              </Link>
            </div>
          )}
        </article>
        <div id="article-socials" className="md:w-1/3 hidden md:block"></div>
      </section>
    </>
  );
};

// Article.getLayout = function getLayout(page: ReactElement) {
//   return <PrivateLayout>{page}</PrivateLayout>;
// };

export const getStaticPaths: GetStaticPaths = async (context) => {
  const articles = await getArticleSlugs();
  const paths = articles.map(({ articleSlug, category, product }) => ({
    params: {
      articleSlug,
      categorySlug: category.categorySlug,
      productSlug: product.productSlug,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async (context) => {
  const categorySlug = context.params!.categorySlug as string;
  const productSlug = context.params!.productSlug as string;
  const articleSlug = context.params!.articleSlug as string;

  const article = await getArticlePage(context.params!.articleSlug as string);

  return {
    props: {
      article,
      articleSlug,
      categorySlug,
      productSlug,
    },
  };
};

export default Article;
