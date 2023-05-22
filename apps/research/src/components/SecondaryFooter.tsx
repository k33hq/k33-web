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

// TODO: md:pl-[208px] md:pr-[384px] to match with the figma
const SecondaryFooter: React.FC<SecondaryFooterProps> = ({ categories }) => {
  return (
    <div className="bg-bg-dark-secondary md:h-14">
      <div className="md:container flex flex-col md:flex-row items-center py-6 md:py-4 md:px-0 px-6 gap-4 md:gap-0 transition-all ease-in-out lg:pl-[208px]">
        <div className="lg:w-[389px] w-full flex flex-col items-center md:items-start">
          <Link href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research`}>
            <Image src={researchLogo} width={144} alt="research" />
          </Link>
        </div>
        <div className="flex flex-row md:gap-36 gap-12">
          <div
            id="research-products"
            className="flex md:flex-row flex-col gap-4"
          >
            <p className="text-body1 text-label-dark-primary">Products</p>
            {categories
              .filter(
                (c) => !['opinion', 'analysis', 'blog'].includes(c.categorySlug)
              )
              .map((category) => (
                <Link
                  key={category.categorySlug}
                  className="text-body4 text-label-dark-tertiary hover:text-label-dark-primary"
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
                className="text-body4 text-label-dark-tertiary hover:text-label-dark-primary"
                href={social.url}
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-auto"></div>
    </div>
  );
};

export default SecondaryFooter;
