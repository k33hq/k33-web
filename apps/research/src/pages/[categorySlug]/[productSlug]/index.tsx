import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  getProductBySlug,
  getProductSlugsByCategory,
  getArticleElementsByProductAndCategories,
} from '@/api';
import {
  ArticleElements,
  CategorySlug,
  NextPageWithLayout,
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

import { getUrl } from '@/utils';
import { ReactElement } from 'react';
import { PrivateLayout } from '@/layouts';

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
  return (
    <>
      <div className="w-auto relative h-80">
        <Image
          src={product.image.url}
          alt={product.image.title}
          fill
          style={{
            objectFit: 'contain',
            top: 0,
          }}
        />
      </div>
      <Indicator color={branding.color} />
      <section
        id={`k33-${product.sys.id}-reports`}
        className="md:container flex flex-col md:pt-20 md:gap-12 pt-10 gap-6 px-2 md:px-0"
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
          id={`k33-${product.sys.id}-report-list`}
          className="flex flex-row md:gap-12 gap-6 flex-wrap overflow-auto"
        >
          {articles.map((article) => (
            <ArticleElement key={article.articleSlug} {...article} />
          ))}
        </div>
      </section>
    </>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

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
