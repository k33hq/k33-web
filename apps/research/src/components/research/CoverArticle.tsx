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
      className="shadow-md rounded-xl bg-bg-light-primary w-full overflow-hidden flex md:flex-row flex-col ring-1 ring-brand-light-tertiary/10"
    >
      <div className="relative md:w-2/5 md:h-80 h-40">
        {article.coverPicture ? (
          <Link
            href={getUrl(
              category.categorySlug,
              product.productSlug,
              articleSlug
            )}
            className="cursor-pointer"
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
      <div id="article-information" className="p-12 flex flex-col gap-4">
        <div className="flex flex-col g-2">
          <div
            id="article-meta-title"
            className="flex flex-row gap-3 items-center"
          >
            <ProductTitle
              {...{
                branding: product.branding,
                title: product.product.title,
                href: getUrl(category.categorySlug, product.productSlug),
              }}
            />
            <Dot />
            <p className="text-body4 text-label-light-secondary">
              {formatDateAndTime(publishedDate, 'day')}
            </p>
          </div>
          <Link
            className="text-label-light-primary text-heading5 hover:text-label-light-secondary"
            href={getUrl(
              category.categorySlug,
              product.productSlug,
              articleSlug
            )}
          >
            {article.title}
          </Link>
          <ArticleSubtitle>{article.subtitle}</ArticleSubtitle>
        </div>
      </div>
    </div>
  );
};

export default CoverArticle;
