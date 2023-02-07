import { CategoryPage, ProductElementsWithArticleElements } from '@/types';
import {
  getProductElementsAndArticleElementsByCategory,
  getAllCategorySlugs,
  getCategoryPage,
} from '@/api';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ProductsWithArticles } from '@/components';

interface CategoryProps {
  category: CategoryPage;
  products: ProductElementsWithArticleElements;
}

const Category: NextPage<CategoryProps> = ({ category, products }) => {
  return (
    <div className="flex flex-col gap-10 pt-20 bg-bg-light-secondary">
      <div
        className="flex flex-col gap-4 md:container"
        id="research-category-banner"
      >
        <p className="text-heading5 text-label-light-primary">
          {category.category.title}
        </p>
        <p className="text-heading8 text-label-light-secondary">
          {category.category.description}
        </p>
      </div>
      <div className="bg-scroll bg-category-products bg-blend-soft-light bg-center bg-no-repeat bg-cover">
        <div
          id="research-category-products"
          className={`pt-20 px-16 pb-24 md:container flex flex-row justify-between flex-wrap`}
        >
          {products.map((product) => (
            <ProductsWithArticles key={product.productSlug} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
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
