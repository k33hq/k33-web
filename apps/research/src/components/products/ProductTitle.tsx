import * as React from 'react';
import Marker from '../Marker';
import { Brand } from '../../types/domain';
import Link from 'next/link';

export interface ProductTitleProps {
  size?: 'large' | 'small';
  branding: Brand;
  title: string;
  href: string;
}

const ProductTitle: React.FC<ProductTitleProps> = ({
  size = 'large',
  branding,
  title,
  href,
}) => {
  return (
    <div
      id="research-product-branding-title"
      className="flex flex-row gap-1 items-center"
    >
      <Marker color={branding.color} size={size} />
      <p
        className={`${
          size === 'large'
            ? 'md:text-heading8 text-body1 text-label-light-secondary'
            : 'md:text-caption text-xsmall text-label-light-secondary'
        }`}
      >
        {title}
      </p>
      {/* <Link
        className={`${
          size === 'large'
            ? 'md:text-heading8 text-body1 text-label-light-secondary'
            : 'md:text-caption text-xsmall text-label-light-secondary'
        } hover:text-label-light-tertiary uppercase`}
        href={href}
      >
        {title}
      </Link> */}
    </div>
  );
};

export default ProductTitle;
