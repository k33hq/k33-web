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
// TODO: put research social links in contentful later

const socials = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/K33Research?ref_src=twsrc%5Etfw',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/showcase/arcaneresearch',
  },
  {
    name: 'Email',
    url: 'mailto:research@k33.com',
  },
];
const SecondaryFooter: React.FC<SecondaryFooterProps> = ({ categories }) => {
  return (
    <div className="bg-bg-dark-secondary md:h-14">
      <div className="md:container flex flex-col md:flex-row items-center py-6 md:py-4 md:justify-between md:px-0 px-6 md:gap-12 gap-6">
        <Link href={process.env.NEXT_PUBLIC_RESEARCH_URL as string}>
          <Image src={researchLogo} width={144} alt="research" />
        </Link>
        <div id="research-products" className="flex md:flex-row flex-col gap-4">
          <p className="text-body1 text-label-dark-primary">Products</p>
          {categories
            .filter((c) => !['opinion', 'analysis'].includes(c.categorySlug))
            .map((category) => (
              <Link
                key={category.categorySlug}
                className="text-body4 text-label-dark-tertiary"
                href={getUrl(category.categorySlug)}
              >
                {category.category.title}
              </Link>
            ))}
        </div>
        <div id="research-social" className="flex md:flex-row flex-col gap-4">
          <p className="text-body1 text-label-dark-primary">Connect</p>
          {socials.map((social) => (
            <Link
              key={social.name}
              className="text-body4 text-label-dark-tertiary"
              href={social.url}
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryFooter;
