import { HomeArticleElement } from '../../types/domain';
import Image from 'next/image';
import * as React from 'react';
import ProductTitle from '../products/ProductTitle';
import { getUrl } from '../../utils';
import Dot from '../Dot';
import { formatDateAndTime } from '@contentful/f36-datetime';
import Link from 'next/link';
import ArticleSubtitle from '../articles/ArticleSubtitle';

interface CoverArticleProps extends HomeArticleElement {}

// TODO: hard width instead of percentage
const CoverArticle: React.FC<CoverArticleProps> = ({
  product,
  category,
  article,
  articleSlug,
  publishedDate,
}) => {
  return (
    <div
      id="main-article"
      className="rounded-xl bg-bg-light-primary overflow-hidden flex md:flex-row flex-col ring-1 ring-brand-light-tertiary/10 h-[336px] lg:h-[336px] w-full drop-shadow-md transition-all ease-in"
    >
      <div className="relative xl:w-[672px] aspect-[1.91/1]">
        {article.coverPicture ? (
          <Link
            href={getUrl(
              category.categorySlug,
              product.productSlug,
              articleSlug
            )}
            className="cursor-pointer transition-all"
          >
            <Image
              src={article.coverPicture.url}
              fill
              style={{
                objectFit: 'cover',
              }}
              alt={article.coverPicture.title}
            />
          </Link>
        ) : null}
      </div>
      <div
        className="flex flex-col gap-2 md:p-8 lg:p-12 p-4 transition-all ease-in-out"
        id="article-information"
      >
        <div
          id="article-meta-title"
          className="flex flex-row gap-3 items-center"
        >
          <ProductTitle
            {...{
              branding: product.branding,
              title: product.product.title,
              href:
                category.categorySlug === 'reports'
                  ? getUrl(category.categorySlug, product.productSlug)
                  : getUrl(category.categorySlug),
            }}
          />
          <Dot />
          <p className="text-body4 text-label-light-secondary">
            {formatDateAndTime(publishedDate, 'day')}
          </p>
        </div>
        <Link
          className="text-label-light-primary xl:text-heading5 text-body1 hover:text-label-light-secondary"
          href={getUrl(category.categorySlug, product.productSlug, articleSlug)}
        >
          {article.title}
        </Link>
        <p className="text-body4 text-label-light-secondary/80 line-clamp-4 text-ellipsis">
          {article.subtitle}
        </p>
      </div>
    </div>
  );
};

export default CoverArticle;
