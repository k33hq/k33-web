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
    <div className="flex flex-col gap-12 h-[576px] min-w-30">
      <ProductElement {...{ product, productSlug, categoryWeb, branding }} />
      <div className="flex flex-row items-center justify-between">
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
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsWithArticles;
