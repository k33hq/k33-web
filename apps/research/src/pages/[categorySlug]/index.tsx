import {
  ArticleElements,
  CategoryPage,
  ProductElementsWithArticleElements,
} from '@/types';
import {
  getAllCategorySlugs,
  getArticleElementsByProductAndCategories,
  getCategoryPage,
  getProductArticleElementsByCategories,
  getRemainingProducts,
} from '@/api';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  ArticleElement,
  ProductTitle,
  ProductsWithArticles,
} from '@/components';
import { ReactElement } from 'react';
import { PrivateLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';
import { getUrl, siteUsername } from '@/utils';
import Head from 'next/head';
import { getTitle } from 'platform-js';

interface CategoryProps extends CategoryPage {
  categorySlug: string;
  products: ProductElementsWithArticleElements;
  productArticles: ArticleElements[];
}

const Category: NextPageWithLayout<CategoryProps> = ({
  category,
  highlightedProductsCollection,
  products,
  title,
  seo,
  categorySlug,
  productArticles,
}) => {
  const getSeo = () => {
    if (seo)
      return (
        <>
          <>
            <meta name="description" content={seo.description} />
            <meta property="og:title" content={seo.title} key="ogtitle" />
            <meta
              property="og:description"
              content={seo.description}
              key="ogdesc"
            />

            <meta property="og:image" content={seo.image.url} />

            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image.url} />
          </>
        </>
      );
    return (
      <>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta
          property="og:description"
          content={category.description}
          key="ogdesc"
        />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={category.description} />
      </>
    );
  };

  return (
    <>
      <Head>
        {getSeo()}
        <title>{getTitle('Research', title)}</title>
        <meta name="twitter:site" content={siteUsername} />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_RESEARCH_URL + getUrl(categorySlug)}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="flex flex-col pt-12 md:pt-20 bg-bg-light-secondary">
        <div
          className="flex flex-col md:gap-4 gap-2 pb-24 md:pb-20 md:container px-6 md:px-0"
          id="research-category-banner"
        >
          <p className="md:text-heading5 text-heading6 text-label-light-primary">
            {category.title}
          </p>
          <p className="md:text-heading8 text-body1 text-label-light-secondary">
            {category.description}
          </p>
        </div>
        <div className="bg-scroll bg-category-products bg-blend-soft-light bg-center bg-no-repeat bg-cover">
          <div
            id="research-category-products"
            className={`md:pt-[88px] md:pb-[56px] py-8 md:px-10 md:container flex md:flex-row flex-col sm:justify-center justify-start md:flex-wrap w-full md:gap-60 gap-20 transition-all`}
          >
            {highlightedProductsCollection.items.map((product) => (
              <ProductsWithArticles key={product.productSlug} {...product} />
            ))}
          </div>
        </div>
      </div>
      <div
        id={`k33-${category.title}-products`}
        className="flex flex-row md:gap-12 gap-6 items-center md:justify-start transition-all pb-24"
      >
        {productArticles.map((articles) => (
          <div
            id={`k33-${articles[0].product.productSlug}-reports`}
            className="flex flex-col md:pt-[96px] md:gap-0 pt-[89px] gap-6 w-full"
          >
            <div
              id="k33-research-info"
              className="flex flex-col gap-2 px-6 md:px-0 md:container"
            >
              <ProductTitle
                title={articles[0].product.product.title}
                branding={articles[0].product.branding}
                href={getUrl(categorySlug, articles[0].product.productSlug)}
              />
              <p className="md:text-body1 text-body2 text-label-light-secondary">
                {articles[0].product.product.description}
              </p>
            </div>
            <div
              id={`k33-${articles[0].product.productSlug}-report-list`}
              className="flex flex-row md:gap-12 md:py-12 py-4 gap-12 md:justify-center md:items-center overflow-auto px-1 md:px-0"
            >
              {articles.map((article) => (
                <ArticleElement
                  key={article.articleSlug}
                  {...article}
                  category={{ categorySlug, ...category }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Category.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = await getAllCategorySlugs();
  const paths = categorySlugs.map(({ categorySlug }) => ({
    params: { categorySlug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { category, highlightedProductsCollection, title, seo } =
    await getCategoryPage(context.params!.categorySlug as string);

  const products = await getProductArticleElementsByCategories(
    context.params!.categorySlug as string,
    highlightedProductsCollection.items.map((product) => product.productSlug)
  );

  const productSlugs = await getRemainingProducts(
    context.params!.categorySlug as string,
    highlightedProductsCollection.items.map((product) => product.productSlug)
  );

  const productArticles = await Promise.all(
    productSlugs.map(async ({ productSlug }) => {
      const article = await getArticleElementsByProductAndCategories(
        context.params!.categorySlug as string,
        productSlug,
        5
      );
      return article;
    })
  );

  return {
    props: {
      categorySlug: context.params!.categorySlug as string,
      seo,
      category,
      highlightedProductsCollection,
      title,
      products,
      productArticles,
    },
  };
};

export default Category;
