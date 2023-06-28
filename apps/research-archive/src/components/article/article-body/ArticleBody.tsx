import { DefaultRichTextRenderer } from '@/components';
import styles from './styles.module.scss';
import { ArchivedArticleContent } from '@/types';
import * as React from 'react';

interface ArticleBodyProps extends Pick<ArchivedArticleContent, 'content'> {}

const ArticleBody: React.FC<ArticleBodyProps> = ({ content }) => {
  if (!content) return;
  return (
    <div id="article-body" className={styles.articleBody}>
      <DefaultRichTextRenderer document={content} />
    </div>
  );
};

export default ArticleBody;
