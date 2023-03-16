import { ProductElementsWithArticleElement } from '../../types/domain';
import * as React from 'react';
import ProductElement from './ProductElement';
import ArticleElement from '../articles/ArticleElement';

interface ProductsWithArticlesProps extends ProductElementsWithArticleElement {}

const ProductsWithArticles: React.FC<ProductsWithArticlesProps> = ({
  categoryWeb,
  branding,
  product,
  productSlug,

  linkedFrom,
}) => {
  const { articleWebCollection } = linkedFrom;
  return (
    <div className="flex flex-col gap-4 sm:w-[568px] sm:h-[616px]">
      <div className="md:container md:px-0 px-6">
        <ProductElement {...{ product, productSlug, categoryWeb, branding }} />
      </div>
      <div className="flex flex-row sm:items-center overflow-x-auto sm:overflow-hidden gap-12 sm:justify-between md:py-8 md:px-2 px-1 py-6 transition-all">
        {articleWebCollection.items.map((article) => (
          <ArticleElement
            key={article.articleSlug}
            {...article}
            product={{
              branding: branding,
              product: product,
              productSlug: productSlug,
            }}
            category={categoryWeb}
            animate={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsWithArticles;
