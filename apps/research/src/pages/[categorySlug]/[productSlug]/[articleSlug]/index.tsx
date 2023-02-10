import { getArticlePage, getArticleSlugs } from 'src/api/articles';
import { ArticlePage } from '@/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getUrl } from '@/utils';
import {
  Indicator,
  ReportsDownload,
  NutShell,
  KeyPoints,
  ArticleTitle,
} from '@/components';
import Image from 'next/image';

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
  console.log(article);
  return (
    <>
      <Indicator color={product.branding.color} />
      <div className="md:pt-16 pt-12 md:container px-6">
        <aside
          className="float-left w-1/4 hidden md:visible"
          aria-label="Sidebar"
        >
          <p>Hosted by</p>
        </aside>
        <div className="flex flex-col justify-center md:gap-8 gap-6">
          <ArticleTitle
            published={article.sys.firstPublishedAt}
            product={{
              title: product.product.title,
              href: getUrl(categorySlug, productSlug),
              branding: product.branding,
            }}
            title={article.title}
          />
          <div className="w-auto h-px bg-default-systemGrey-light-2/20" />
          <NutShell document={article.summary} />
          <KeyPoints points={article.keyPoints} />
          <div className="px-6">
            {article.image ? (
              <Image
                src={article.image.url}
                fill
                alt={article.image.description}
                style={{
                  objectFit: 'contain',
                }}
              />
            ) : null}
          </div>
          <ReportsDownload />
        </div>
      </div>
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
