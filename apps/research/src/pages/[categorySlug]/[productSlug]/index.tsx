import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
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

import { getUrl } from '@/utils';

interface ProductProps extends CategorySlug, ProductCoreSlug {
  product: ProductPage;
  articles: ArticleElements;
}

const Product: NextPage<ProductProps> = ({
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
        className="md:container flex flex-col pt-20 gap-12"
      >
        <div id="k33-research-info" className="flex flex-col gap-2">
          <ProductTitle
            title={product.title}
            branding={branding}
            href={getUrl(categorySlug, productSlug)}
          />
          <p className="text-body1 text-label-light-secondary">
            {product.description}
          </p>
        </div>
        <div
          id={`k33-${product.sys.id}-report-list`}
          className="flex flex-row gap-12 flex-wrap"
        >
          {articles.map((article) => (
            <ArticleElement key={article.articleSlug} {...article} />
          ))}
        </div>
      </section>
    </>
  );
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
