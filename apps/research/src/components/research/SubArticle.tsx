import { HomeArticleElement } from '../../types/domain';
import Image from 'next/image';
import * as React from 'react';
import ProductTitle from '../products/ProductTitle';
import { getUrl } from '../../utils';
import ArticleDate from '../articles/ArticleDate';
import Link from 'next/link';
import ArticleSubtitle from '../articles/ArticleSubtitle';

interface SubArticleProps extends HomeArticleElement {}

const SubArticle: React.FC<SubArticleProps> = ({
  article,
  articleSlug,
  product,
  publishedDate,
  category,
}) => {
  return (
    <div
      id="main-article"
      className="shadow-md rounded-xl bg-bg-light-primary overflow-hidden flex flex-col min-w-[336px] h-[336px] ring-1 ring-brand-light-tertiary/10"
    >
      <div className="relative w-full h-1/2">
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

      <div id="article-information" className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2">
          <div
            id="article-meta-title"
            className="flex flex-row gap-3 items-center"
          >
            <ProductTitle
              size="small"
              title={product.product.title}
              branding={product.branding}
              href={getUrl(category.categorySlug, product.productSlug)}
            />
            <ArticleDate size="small" published={publishedDate} />
          </div>
          <Link
            className="text-label-light-primary text-body1 hover:text-label-light-secondary"
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

export default SubArticle;
