import { Article as ArticleType } from '@/types';
import * as React from 'react';
import styles from './styles.module.css';
import { ArticleHeader } from './article-header';
import { ArticleInShorts, ArticleTakeAways } from './article-body';

interface ArticleProps
  extends Pick<
    ArticleType,
    'title' | 'subtitle' | 'image' | 'body' | 'keyPoints' | 'summary'
  > {}

const Article: React.FC<ArticleProps> = ({
  title,
  subtitle,
  image,
  keyPoints,
  summary,
}) => {
  return (
    <article id="article" className={styles.article}>
      <ArticleHeader title={title} subtitle={subtitle} image={image} />
      <div id="article-summary" className={styles.articleSummary}>
        <ArticleInShorts summary={summary} />
        <ArticleTakeAways keyPoints={keyPoints} />
      </div>
    </article>
  );
};

export default Article;
