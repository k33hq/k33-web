import {
  ArticleCategoryElements,
  ArticleElements,
  CategoryPage,
  ProductElementsWithArticleElements,
} from '@/types';
import {
  getAllCategorySlugs,
  getArticleElementByCategories,
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
  ArticleDate,
  ArticleSubtitle,
} from '@/components';
import { ReactElement } from 'react';
import { PrivateLayout } from '@/layouts';
import { Marker, NextPageWithLayout } from 'ui';
import { getUrl, siteUsername } from '@/utils';
import Head from 'next/head';
import { getTitle } from 'platform-js';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateAndTime } from '@contentful/f36-datetime';

interface CategoryProps extends CategoryPage {
  categorySlug: string;
  productArticles: readonly ArticleCategoryElements[] | ArticleElements[];
}

const Category: NextPageWithLayout<CategoryProps> = ({
  category,
  highlightedProductsCollection,

  title,
  seo,
  categorySlug,
  productArticles,
  type,
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
          content={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research` + getUrl(categorySlug)}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="flex flex-col pt-12 lg:pt-20 bg-bg-light-secondary">
        <div
          className="flex flex-col lg:gap-4 gap-2 pb-24 lg:pb-20 lg:container px-6 lg:px-0"
          id="research-category-banner"
        >
          <p className="md:text-heading5 text-heading6 text-label-light-primary">
            {category.title}
          </p>
          <p className="md:text-heading8 text-body1 text-label-light-secondary">
            {category.description}
          </p>
        </div>
        {type && (
          <div className="bg-scroll bg-category-products bg-blend-soft-light bg-center bg-no-repeat bg-cover">
            <div
              id="research-category-products"
              className={`lg:pt-[88px] lg:pb-[56px] py-8 lg:px-10 lg:container flex lg:flex-row flex-col lg:justify-center justify-start lg:flex-wrap w-full lg:gap-60 gap-20 transition-all`}
            >
              {highlightedProductsCollection.items.map((product) => (
                <ProductsWithArticles key={product.productSlug} {...product} />
              ))}
            </div>
          </div>
        )}
      </div>
      {type ? (
        <div
          id={`k33-${category.title}-products`}
          className="flex flex-row lg:gap-12 gap-6 items-center lg:justify-start transition-all pb-[120px]"
        >
          {(productArticles as readonly ArticleElements[]).map((articles) => (
            <div
              id={`k33-${articles[0].product.productSlug}-reports`}
              className="flex flex-col lg:pt-[96px] lg:gap-0 pt-[89px] gap-6 w-full"
            >
              <div
                id="k33-research-info"
                className="flex flex-col gap-2 px-6 lg:px-0 lg:container"
              >
                <ProductTitle
                  title={articles[0].product.product.title}
                  branding={articles[0].product.branding}
                  href={
                    categorySlug === 'reports'
                      ? getUrl(categorySlug, articles[0].product.productSlug)
                      : getUrl(categorySlug)
                  }
                />
                <p className="md:text-body1 text-body2 text-label-light-secondary">
                  {articles[0].product.product.description}
                </p>
              </div>
              <div
                id={`k33-${articles[0].product.productSlug}-report-list`}
                className="flex flex-row lg:gap-12 lg:py-12 py-4 gap-12 lg:justify-center lg:items-center overflow-auto px-1 lg:px-0"
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
      ) : (
        <div className="pb-[120px] pt-[65px] lg:pt-[88px] flex flex-col">
          <div
            id="k33-research-info"
            className="flex flex-col gap-2 px-6 lg:px-0 lg:container"
          >
            <div
              id="research-product-branding-title"
              className="flex flex-row gap-1 items-center"
            >
              <Marker
                color={highlightedProductsCollection.items[0].branding.color}
              />
              <Link
                className={`md:text-heading8 text-body1 text-label-light-secondary hover:text-label-light-tertiary uppercase`}
                href={getUrl(categorySlug)}
              >
                {title}
              </Link>
            </div>
            <p className="md:text-body1 text-body2 text-label-light-secondary">
              {highlightedProductsCollection.items[0].product.description}
            </p>
          </div>
          <div
            id={`k33-${category.title}-products`}
            className="flex flex-row overflow-auto gap-2 lg:gap-8 lg:flex-col lg:container lg:pt-12 pt-10 pb-[120px] md:px-4 px-1"
          >
            {(productArticles as ArticleCategoryElements[]).map(
              ({ article, category, product, publishedDate, articleSlug }) => (
                <div
                  id="main-article"
                  className="rounded-xl bg-bg-light-primary overflow-hidden flex flex-col lg:flex-row lg:w-full min-w-[336px] min-h-[336px] lg:h-[271px] ring-1 ring-brand-light-tertiary/20 drop-shadow-sm transition-all"
                >
                  <div className="relative aspect-[1.91/1] min-h-[168px] lg:min-h-271">
                    {article.thumbnail ? (
                      <Link
                        href={getUrl(
                          category.categorySlug,
                          product.productSlug,
                          articleSlug
                        )}
                        className="cursor-pointer"
                      >
                        <Image
                          src={article.coverPicture.url}
                          fill
                          style={{
                            objectFit: 'cover',
                          }}
                          alt={article.coverPicture.title}
                        />
                      </Link>
                    ) : null}
                  </div>

                  <div
                    id="article-information"
                    className="flex flex-col gap-2 p-4 lg:p-[42.5px]"
                  >
                    <div className="flex flex-col gap-2">
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
                            className={`xl:leading-4 xl:font-[600] xl:text-[24px] xl:text-body4 text-small text-label-light-primary/60 hover:text-label-light-tertiary uppercase`}
                            href={getUrl(category.categorySlug)}
                          >
                            {title}
                          </Link>
                        </div>

                        <p className="xl:text-body4 text-label-light-secondary/60 text-small">
                          {formatDateAndTime(publishedDate, 'day')}
                        </p>
                      </div>
                      <Link
                        className="text-label-light-primary text-body1 lg:text-heading8 xl:text-heading6 hover:text-label-light-secondary transition-all"
                        href={getUrl(
                          category.categorySlug,
                          product.productSlug,
                          articleSlug
                        )}
                      >
                        {article.title}
                      </Link>
                      <p className="text-body4 text-label-light-secondary/80 line-clamp-2 text-ellipsis">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Category.getLayout = function getLayout(page: ReactElement) {
//   return <PrivateLayout>{page}</PrivateLayout>;
// };

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
  const { category, highlightedProductsCollection, title, seo, type } =
    await getCategoryPage(context.params!.categorySlug as string);

  const productSlugs = await getRemainingProducts(
    context.params!.categorySlug as string,
    highlightedProductsCollection.items.map((product) => product.productSlug)
  );

  const productArticles = type
    ? await Promise.all(
        productSlugs.map(async ({ productSlug }) => {
          const article = await getArticleElementsByProductAndCategories(
            context.params!.categorySlug as string,
            productSlug,
            5
          );
          return article;
        })
      )
    : await getArticleElementByCategories(
        context.params!.categorySlug as string,
        100
      );

  return {
    props: {
      categorySlug: context.params!.categorySlug as string,
      seo,
      type,
      category,
      highlightedProductsCollection,
      title,
      productArticles,
    },
  };
};

export default Category;
