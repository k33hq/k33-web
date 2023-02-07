import { CategoryAndArticle } from '../../types/domain';
import Link from 'next/link';
import * as React from 'react';
import { getUrl } from '../../utils';
import { ArticleElement } from '../articles';
import Marker from '../Marker';

interface CategoriesAndArticleElementsProps extends CategoryAndArticle {}

const CategoriesAndArticleElements: React.FC<
  CategoriesAndArticleElementsProps
> = ({ category, categorySlug, linkedFrom }) => {
  if (!(linkedFrom.articleWebCollection.items.length > 0)) return <></>;

  return (
    <div id="category-article" className="flex flex-col gap-10 pb-28">
      <div
        id="category-title"
        className="flex flex-row items-center justify-between"
      >
        <div
          id="research-product-branding-title"
          className="flex flex-row gap-1 items-center"
        >
          <Marker
            color={
              linkedFrom.articleWebCollection.items[0].product.branding.color
            }
          />
          <Link
            className="text-body1 text-label-light-secondary uppercase hover:text-label-light-tertiary"
            href={getUrl(categorySlug)}
          >
            {category.title}
          </Link>
        </div>
        <Link
          className="text-caption text-brand-light-primary content-center hover:text-label-light-secondary"
          href={getUrl(categorySlug)}
        >
          see more
        </Link>
      </div>
      <div
        id="category-article-list"
        className="flex flex-row items-center flex-wrap gap-16"
      >
        {linkedFrom.articleWebCollection.items.map((article) => (
          <ArticleElement {...article} key={article.articleSlug} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesAndArticleElements;
