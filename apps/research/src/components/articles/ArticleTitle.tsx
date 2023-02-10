import * as React from 'react';
import Dot from '../Dot';
import { ProductTitleProps } from '../products';
import { formatDateAndTime } from '@contentful/f36-datetime';
import ProductTitle from '../products/ProductTitle';

interface ArticleTitleProps {
  product: ProductTitleProps;
  published: string;
  title: string;
}

const ArticleTitle: React.FC<ArticleTitleProps> = ({
  product,
  published,
  title,
}) => {
  return (
    <div className="flex flex-col g-2">
      <div id="article-meta-title" className="flex flex-row gap-3 items-center">
        <ProductTitle {...product} />
        <Dot />
        <p className="md:text-body4 text-small text-label-light-secondary">
          {formatDateAndTime(published, 'day')}
        </p>
      </div>
      <p className="md:text-heading7 text-heading8 text-label-light-primary">
        {title}
      </p>
    </div>
  );
};

export default ArticleTitle;
