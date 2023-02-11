import { CategoryPage, ProductElementsWithArticleElements } from '@/types';
import {
  getProductElementsAndArticleElementsByCategory,
  getAllCategorySlugs,
  getCategoryPage,
} from '@/api';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ProductsWithArticles } from '@/components';
import { ReactElement } from 'react';
import { PrivateLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';

interface CategoryProps {
  category: CategoryPage;
  products: ProductElementsWithArticleElements;
}

const Category: NextPageWithLayout<CategoryProps> = ({
  category,
  products,
}) => {
  return (
    <div className="flex flex-col md:gap-10 md:pt-20 gap-4 pt-10 px-2 md:px-0 bg-bg-light-secondary">
      <div
        className="flex flex-col md:gap-4 gap-2 md:container"
        id="research-category-banner"
      >
        <p className="md:text-heading5 text-heading6 text-label-light-primary">
          {category.category.title}
        </p>
        <p className="md:text-heading8 text-body1 text-label-light-secondary">
          {category.category.description}
        </p>
      </div>
      <div className="bg-scroll bg-category-products bg-blend-soft-light bg-center bg-no-repeat bg-cover">
        <div
          id="research-category-products"
          className={`md:pt-20 pt-8 md:px-16 px-4 pb-24 md:container flex md:flex-row flex-col justify-start md:flex-wrap w-full md:gap-60 gap-20`}
        >
          {products.map((product) => (
            <ProductsWithArticles key={product.productSlug} {...product} />
          ))}
        </div>
      </div>
    </div>
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
  const category = await getCategoryPage(
    context.params!.categorySlug as string
  );
  const products = await getProductElementsAndArticleElementsByCategory(
    context.params!.categorySlug as string
  );

  return {
    props: {
      category,
      products,
    },
  };
};

export default Category;
