import { Article as ArticleType } from '@/types';
import * as React from 'react';
import styles from './styles.module.css';
import { ArticleHeader } from './article-header';
import { ArticleTakeAways } from './article-body';

interface ArticleProps
  extends Pick<
    ArticleType,
    'title' | 'subtitle' | 'image' | 'body' | 'keyPoints'
  > {}

const Article: React.FC<ArticleProps> = ({
  title,
  subtitle,
  image,
  keyPoints,
}) => {
  return (
    <article className={styles.article}>
      <ArticleHeader title={title} subtitle={subtitle} image={image} />
      <ArticleTakeAways keyPoints={keyPoints} />
    </article>
  );
};

export default Article;
