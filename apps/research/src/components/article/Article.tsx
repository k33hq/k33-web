import { Article as ArticleType } from '@/types';
import * as React from 'react';
import styles from './styles.module.css';
import { ArticleHeader } from './article-header';
import { ArticleBody, ArticleInShorts, ArticleTakeAways } from './article-body';
import { Divider } from 'antd';

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
  body,
}) => {
  return (
    <>
      <ArticleHeader title={title} subtitle={subtitle} image={image} />
      {keyPoints || summary ? (
        <div id="article-summary" className={styles.articleSummary}>
          <ArticleInShorts summary={summary} />
          <ArticleTakeAways keyPoints={keyPoints} />
          <Divider />
        </div>
      ) : null}
      <ArticleBody body={body} />
    </>
  );
};

export default Article;
