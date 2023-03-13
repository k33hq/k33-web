import { CategoryPage, ProductElementsWithArticleElements } from '@/types';
import {
  getProductElementsAndArticleElementsByCategory,
  getAllCategorySlugs,
  getCategoryPage,
  getProductArticleElementsByCategories,
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
}

const Category: NextPageWithLayout<CategoryProps> = ({
  category,
  highlightedProductsCollection,
  products,
  title,
  seo,
  categorySlug,
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
      <div className="flex flex-col md:gap-10 md:pt-20 gap-4 pt-10 bg-bg-light-secondary">
        <div
          className="flex flex-col md:gap-4 gap-2 md:container px-6 md:px-0"
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
            className={`md:py-20 py-8 md:px-16 px-6 md:container flex md:flex-row flex-col justify-start md:flex-wrap w-full md:gap-60 gap-20`}
          >
            {highlightedProductsCollection.items.map((product) => (
              <ProductsWithArticles key={product.productSlug} {...product} />
            ))}
          </div>
        </div>
      </div>
      <div
        id={`k33-${category.title}-products`}
        className="flex flex-row md:gap-12 gap-6 flex-wrap items-center justify-center md:justify-start"
      >
        {products.map(({ branding, product, productSlug, linkedFrom }) => (
          <div
            id={`k33-${productSlug}-reports`}
            className="md:container flex flex-col md:pt-20 md:gap-12 pt-10 gap-6 px-6 md:px-0"
          >
            <div id="k33-research-info" className="flex flex-col gap-2">
              <ProductTitle
                title={product.title}
                branding={branding}
                href={getUrl(categorySlug, productSlug)}
              />
              <p className="md:text-body1 text-body2 text-label-light-secondary">
                {product.description}
              </p>
            </div>
            <div
              id={`k33-${productSlug}-report-list`}
              className="flex flex-row md:gap-12 gap-6 flex-wrap items-center justify-center md:justify-start"
            >
              {linkedFrom.articleWebCollection.items.map((article) => (
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
  return {
    props: {
      categorySlug: context.params!.categorySlug as string,
      seo,
      category,
      highlightedProductsCollection,
      title,
      products,
    },
  };
};

export default Category;
