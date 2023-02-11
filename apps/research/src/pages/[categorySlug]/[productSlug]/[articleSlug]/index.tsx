import { getArticlePage, getArticleSlugs } from '@/api';
import { ArticlePage } from '@/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getUrl } from '@/utils';
import {
  Indicator,
  ReportsDownload,
  NutShell,
  KeyPoints,
  ArticleTitle,
  ArticleBody,
} from '@/components';
import Image from 'next/image';
import { Divider } from 'ui';

interface ArticleProps {
  articleSlug: string;
  categorySlug: string;
  productSlug: string;
  article: ArticlePage;
}

const Article: NextPage<ArticleProps> = ({
  productSlug,
  categorySlug,
  article: articlePage,
  articleSlug,
}) => {
  const { article, product } = articlePage;
  return (
    <>
      <Indicator color={product.branding.color} />
      <section
        id="main-article-section"
        className="flex md:flex-row flex-col-reverse md:container pt-6 md:py-12 md:pt-16 md:gap-6 gap-20"
      >
        <div className="md:w-1/3 w-full bg-bg-light-secondary px-6 md:px-0 py-10">
          <p>Written by</p>
        </div>
        <article className="flex flex-col justify-center md:gap-8 gap-6 md:w-2/3 w-full px-6 md:px-0">
          <ArticleTitle
            published={article.sys.firstPublishedAt}
            product={{
              title: product.product.title,
              href: getUrl(categorySlug, productSlug),
              branding: product.branding,
            }}
            title={article.title}
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
          <ArticleBody document={article.body} />
          {article.reportDocument ? (
            <ReportsDownload
              url={article.reportDocument.url}
              title={article.reportDocument.title}
            />
          ) : null}
        </article>
        <div id="article-socials" className="md:w-1/3 md:visible hidden"></div>
      </section>
    </>
  );
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
