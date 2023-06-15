import { DefaultRichTextRenderer } from '@/components';
import styles from './styles.module.scss';
import { Article } from '@/types';
import * as React from 'react';

interface ArticleBodyProps extends Pick<Article, 'body'> {}

const ArticleBody: React.FC<ArticleBodyProps> = ({ body }) => {
  if (!body) return;
  return (
    <div id="article-body" className={styles.articleBody}>
      <DefaultRichTextRenderer document={body} />
    </div>
  );
};

export default ArticleBody;
