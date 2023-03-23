import * as React from 'react';
import { ArticleElement as ArticleElementType } from '../../types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import Link from 'next/link';
import Image from 'next/image';
import ProductTitle from '../products/ProductTitle';
import { getUrl } from '../../utils';
import ArticleDate from './ArticleDate';

interface ArticleElementProps extends ArticleElementType {
  animate?: boolean;
}

const ArticleElement: React.FC<ArticleElementProps> = ({
  category,
  article,
  articleSlug,
  publishedDate,
  product,
  animate = true,
}) => {
  return (
    <div
      id={articleSlug}
      className={`flex flex-col w-64 h-[480px] flex-shrink-0 rounded-xl overflow-hidden ring-1 ring-brand-light-tertiary/20 bg-bg-light-primary drop-shadow-xl transition-all ${
        animate ? 'hover:scale-105' : ''
      }`}
    >
      {article.thumbnail ? (
        <div id={articleSlug + '-thumbnail'} className="relative h-[360px]">
          <Link
            href={getUrl(
              category.categorySlug,
              product.productSlug,
              articleSlug
            )}
          >
            <Image
              src={article.thumbnail.url}
              fill
              alt={article.thumbnail.title}
              style={{
                objectFit: 'fill',
              }}
            />
          </Link>
        </div>
      ) : null}

      <div
        id={articleSlug + '-information'}
        className="flex flex-col gap-2 px-3 py-6"
      >
        <div className="flex flex-row items-center justify-between">
          <ProductTitle
            size="small"
            title={product.product.title}
            branding={product.branding}
            href={getUrl(category.categorySlug, product.productSlug)}
          />
          <ArticleDate size="small" published={publishedDate} />
        </div>
        <Link
          className="text-label-light-primary text-body1 hover:text-label-light-secondary line-clamp-2 text-ellipsis"
          href={getUrl(category.categorySlug, product.productSlug, articleSlug)}
        >
          {article.title}
        </Link>
      </div>
    </div>
  );
};

export default ArticleElement;
