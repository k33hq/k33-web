'use client';

import * as React from 'react';
import { CategoryElements, CategorySlugs } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getUrl } from '@/utils';
import Image from 'next/image';
import researchLogo from '../assets/research-logo.svg';

export interface SecondaryHeaderProps {
  categories: CategoryElements;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ categories }) => {
  const pathname = usePathname();

  return (
    <nav className="navbar w-full bg-bg-light-tertiary">
      <div className="md:container flex flex-row gap-12 items-center justify-center h-10">
        <Image src={researchLogo} alt="research-logo" width={143} height={16} />
        <div className="flex-1" />
        <Link
          className={`text-body4 ${
            pathname === '/research'
              ? 'text-label-light-primary'
              : 'text-label-light-secondary'
          }`}
          href={getUrl('home')}
        >
          Home
        </Link>

        {categories.map((c) => (
          <Link
            className={'text-body4 text-label-light-secondary'}
            key={c.categorySlug}
            href={getUrl(c.categorySlug)}
          >
            {c.category.title}
          </Link>
        ))}
        <div className="flex-1" />
      </div>
    </nav>
  );
};

export default SecondaryHeader;
