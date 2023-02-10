import * as React from 'react';
import { ProductElement as ProductElementType } from '../../types/domain';
import Link from 'next/link';
import ProductTitle from './ProductTitle';
import { getUrl } from '../../utils';

interface ProductElementProps extends ProductElementType {}

const ProductElement: React.FC<ProductElementProps> = ({
  product,
  branding,
  productSlug,
  categoryWeb,
}) => {
  return (
    <div className="flex flex-col md:gap-6 gap-2">
      <div
        id="research-category-product"
        className="flex flex-row justify-between content-center items-center"
      >
        <ProductTitle
          branding={branding}
          title={product.title}
          href={getUrl(categoryWeb.categorySlug, productSlug)}
        />
        <Link
          className="text-caption text-brand-light-primary content-center hover:text-label-light-secondary"
          href={getUrl(categoryWeb.categorySlug, productSlug)}
        >
          see more
        </Link>
      </div>
      <p className="md:text-body1 text-body2 text-label-light-primary">
        {product.description}
      </p>
    </div>
  );
};

export default ProductElement;
