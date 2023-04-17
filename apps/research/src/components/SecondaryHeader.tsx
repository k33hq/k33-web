import * as React from 'react';
import { CategoryElements } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getUrl } from '@/utils';
import Image from 'next/image';
import researchLogo from '../assets/research-logo.svg';
import { useRouter } from 'next/router';

export interface SecondaryHeaderProps {
  categories: CategoryElements;
}

// TODO: change this logic so bendik can choose what to show and hide even if category web is defined.
const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ categories }) => {
  const router = useRouter();
  const isLanding =
    router.pathname.startsWith('/products/') || router.pathname === '/';
  return (
    <nav
      className={`navbar w-full ${
        isLanding ? 'bg-bg-dark-primary' : 'bg-bg-light-tertiary'
      }`}
    >
      <div className="xl:container flex flex-row xl:gap-12 gap-6 items-center lg:justify-center h-10 xl:px-0 px-6 overflow-auto">
        <Link href={process.env.NEXT_PUBLIC_RESEARCH_URL as string}>
          <Image
            src={researchLogo}
            alt="research-logo"
            width={109}
            height={12}
          />
        </Link>
        <div className="flex-1" />
        {isLanding ? null : (
          <Link
            className={`text-body4 ${
              router.pathname.includes('home')
                ? 'text-label-light-primary'
                : 'text-label-light-secondary'
            }`}
            href={getUrl('home')}
          >
            Home
          </Link>
        )}
        {categories
          .filter((c) => !['blog', 'token-evaluation'].includes(c.categorySlug))
          .map((c) => (
            <Link
              className={`text-body4 ${
                router.pathname.includes(c.categorySlug)
                  ? 'text-label-light-primary'
                  : 'text-label-light-secondary'
              }`}
              key={c.categorySlug}
              href={getUrl(c.categorySlug)}
            >
              {c.category.title}
            </Link>
          ))}
        {isLanding ? null : (
          <Link
            className={`text-body4 ${
              router.pathname.includes('settings')
                ? 'text-label-light-primary'
                : 'text-label-light-secondary'
            }`}
            href={getUrl('settings')}
          >
            Settings
          </Link>
        )}

        <div className="flex-1" />
      </div>
    </nav>
  );
};

export default SecondaryHeader;
