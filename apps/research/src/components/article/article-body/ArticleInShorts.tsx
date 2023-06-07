import { richTextOptions } from '@/components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Article } from '@/types';
import { Typography } from 'antd';
import * as React from 'react';

interface ArticleInShortsProps extends Pick<Article, 'summary'> {}

const ArticleInShorts: React.FC<ArticleInShortsProps> = ({ summary }) => {
  if (!summary) return;
  return (
    <div id="article-in-shorts">
      <Typography.Title level={3}>In Short</Typography.Title>
      {documentToReactComponents(summary.json, richTextOptions)}
    </div>
  );
};

export default ArticleInShorts;
