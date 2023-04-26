import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getProductBySlug,
  getProductSlugsByCategory,
  getArticleElementsByProductAndCategories,
} from '@/api';
import {
  ArticleElements,
  CategorySlug,
  ProductCoreSlug,
  ProductPage,
} from '@/types';
import Image from 'next/image';
import {
  ProductTitle,
  ArticleElement,
  Indicator,
  ProductsWithArticles,
} from '@/components';
import { NextPageWithLayout } from 'ui';
import { getUrl, siteUsername } from '@/utils';
import Head from 'next/head';
import { getTitle } from 'platform-js';

interface ProductProps extends CategorySlug, ProductCoreSlug {
  product: ProductPage;
  articles: ArticleElements;
}

const Product: NextPageWithLayout<ProductProps> = ({
  product: rootProduct,
  articles,
  categorySlug,
  productSlug,
}) => {
  const { product, branding } = rootProduct;

  const getSeo = () => {
    if (rootProduct.seo)
      return (
        <>
          <>
            <meta name="description" content={rootProduct.seo.description} />
            <meta
              property="og:title"
              content={rootProduct.seo.title}
              key="ogtitle"
            />
            <meta
              property="og:description"
              content={rootProduct.seo.description}
              key="ogdesc"
            />

            <meta property="og:image" content={rootProduct.seo.image.url} />

            <meta name="twitter:title" content={rootProduct.seo.title} />
            <meta
              name="twitter:description"
              content={rootProduct.seo.description}
            />
            <meta name="twitter:image" content={rootProduct.seo.image.url} />
          </>
        </>
      );
    return (
      <>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={rootProduct.title} key="ogtitle" />
        <meta
          property="og:description"
          content={product.description}
          key="ogdesc"
        />
        <meta property="og:image" content={product.image.url} />
        <meta name="twitter:title" content={rootProduct.title} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image.url} />
      </>
    );
  };

  return (
    <>
      <Head>
        {getSeo()}
        <title>{getTitle('Research', rootProduct.title)}</title>
        <meta name="twitter:site" content={siteUsername} />
        <meta
          property="og:url"
          content={
            process.env.NEXT_PUBLIC_RESEARCH_URL +
            `${
              categorySlug === 'reports'
                ? getUrl(categorySlug, productSlug)
                : getUrl(categorySlug)
            }`
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta name="twitter:image:alt" content={product.image.title} />
      </Head>
      <div className="w-auto relative md:h-80 h-44">
        {product.themeImage && (
          <Image
            src={product.themeImage.url}
            alt={product.themeImage.title}
            fill
            style={{
              objectFit: 'cover',
              top: 0,
            }}
          />
        )}
        {product.logo && (
          <div className="m-auto absolute top-0 bottom-0 left-0 right-0 hover:scale-90 transition-all md:w-[650px] w-[289px]">
            <Image src={product.logo.url} alt={product.logo.title} fill />
          </div>
        )}
      </div>
      <Indicator color={branding.color} />
      <section
        id={`k33-${product.sys.id}-reports`}
        className="md:container flex flex-col md:pt-20 md:gap-12 pt-10 gap-6 px-6 md:px-0 pb-[120px]"
      >
        <div id="k33-research-info" className="flex flex-col gap-2">
          <ProductTitle
            title={product.title}
            branding={branding}
            href={
              categorySlug === 'reports'
                ? getUrl(categorySlug, productSlug)
                : getUrl(categorySlug)
            }
          />
          <p className="md:text-body1 text-body2 text-label-light-secondary">
            {product.description}
          </p>
        </div>
        <div
          id={`k33-${product.sys.id}-report-list`}
          className="flex flex-row md:gap-12 gap-6 flex-wrap items-center justify-center md:justify-start"
        >
          {articles.map((article) => (
            <ArticleElement key={article.articleSlug} {...article} />
          ))}
        </div>
      </section>
    </>
  );
};

// Product.getLayout = function getLayout(page: ReactElement) {
//   return <PrivateLayout>{page}</PrivateLayout>;
// };

export const getStaticPaths: GetStaticPaths = async (context) => {
  const products = await getProductSlugsByCategory();
  const paths = products.map(({ categorySlug, productSlug }) => ({
    params: { categorySlug, productSlug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const categorySlug = context.params!.categorySlug as string;
  const productSlug = context.params!.productSlug as string;
  const product = await getProductBySlug(context.params!.productSlug as string);

  const articles = await getArticleElementsByProductAndCategories(
    context.params!.categorySlug as string,
    context.params!.productSlug as string
  );
  return {
    props: {
      product,
      articles,
      categorySlug,
      productSlug,
    },
  };
};

export default Product;
