import { Size } from '../../types/ui';
import { formatDateAndTime } from '@contentful/f36-datetime';
import * as React from 'react';

interface ArticleDateProps {
  published: string;
  size?: Size;
}

const ArticleDate: React.FC<ArticleDateProps> = ({ published, size }) => {
  return (
    <p
      className={
        size === 'large'
          ? 'text-body4 text-label-light-secondary'
          : 'text-small text-label-light-tertiary'
      }
    >
      {formatDateAndTime(published, 'day')}
    </p>
  );
};

export default ArticleDate;
