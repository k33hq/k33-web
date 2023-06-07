import { Article } from '@/types';
import { Typography } from 'antd';
import * as React from 'react';

interface ArticleInShortsProps extends Pick<Article, 'summary'> {}

const ArticleInShorts: React.FC<ArticleInShortsProps> = ({ summary }) => {
  return (
    <div id="article-in-shorts">
      <Typography.Title level={3}>In Short</Typography.Title>
    </div>
  );
};

export default ArticleInShorts;
