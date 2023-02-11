import * as React from 'react';
import { CategoryElements } from '@/types';
import Image from 'next/image';
import researchLogo from '../assets/research-logo.svg';
import Link from 'next/link';
import { getUrl } from '@/utils';

export interface SecondaryFooterProps {
  categories: CategoryElements;
}

// TODO: change style when visited
const SecondaryFooter: React.FC<SecondaryFooterProps> = ({ categories }) => {
  return (
    <div className="bg-bg-dark-secondary md:h-14">
      <div className="md:container flex flex-col md:flex-row items-center py-6 md:py-4 md:justify-between md:px-0 px-6 md:gap-12 gap-6">
        <Image src={researchLogo} width={144} alt="research" />
        <div id="research-products" className="flex md:flex-row flex-col gap-4">
          <p className="text-body1 text-label-dark-primary">Products</p>
          {categories.map((category) => (
            <Link
              key={category.categorySlug}
              className="text-body4 text-label-dark-tertiary"
              href={getUrl(category.categorySlug)}
            >
              {category.category.title}
            </Link>
          ))}
        </div>
        <div id="social"></div>
      </div>
    </div>
  );
};

export default SecondaryFooter;
