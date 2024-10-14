import React from 'react';
import HomeIcon from '../assets/home-icon.svg';
import ChevronRightIcon from '../assets/chevron-right-icon.svg';
import Image from 'next/image';
import Link from 'next/link';

interface BreadcrumbsProps {
  pages: Page[];
}

interface Page {
  name: string;
  href: string;
  current?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pages }) => {
  return (
    <nav aria-label="Breadcrumb" className="px-4 mt-4 flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <Image className="ps-2 w-8 inline" src={HomeIcon} alt={'Home'} />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <Image
                className="ps-2 h-5 w-5 inline"
                src={ChevronRightIcon}
                alt={'>'}
              />
              <Link
                href={page.href}
                aria-current={page.current ? 'page' : undefined}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
