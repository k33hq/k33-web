import { getArticlePage, getArticleSlugs } from '@/api';
import { ArticlePage, SubscriberType } from '@/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getUrl } from '@/utils';
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
import { BasicButton, Divider, NextPageWithLayout } from 'ui';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import { ReactElement, useEffect, useState } from 'react';
import { fetcher } from 'core';
import Link from 'next/link';
import { PrivateLayout } from '@/layouts';
import { useStripeSubscriber } from '@/hooks';
import Head from 'next/head';

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

  return (
    <>
      <Head>
        <title>{article.title}</title>
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
          className={`flex flex-col justify-center md:gap-8 gap-6 md:w-2/3 w-full px-6 md:px-0`}
        >
          <ArticleTitle
            published={publishedDate}
            product={{
              title: product.product.title,
              href: getUrl(categorySlug, productSlug),
              branding: product.branding,
            }}
            title={article.title}
            subtitle={article.subtitle ?? undefined}
          />
          <Divider />
          <NutShell document={article.summary} />
          <KeyPoints points={article.keyPoints} />
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
                Upgrade to K33 Research Pro to download all reports
              </p>
              <Link
                href={getUrl(
                  'subscription',
                  'professional-k33-research-subscription'
                )}
              >
                <BasicButton variant="secondary">
                  Start 30-Day Free Trial
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

Article.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

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
