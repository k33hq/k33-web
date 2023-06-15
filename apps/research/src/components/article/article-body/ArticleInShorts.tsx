import { richTextOptions } from '@/components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Article } from '@/types';
import { Typography } from 'antd';
import styles from './styles.module.scss';
import * as React from 'react';

interface ArticleInShortsProps extends Pick<Article, 'summary'> {}

const ArticleInShorts: React.FC<ArticleInShortsProps> = ({ summary }) => {
  if (!summary) return;
  return (
    <div id="article-in-shorts" className={styles.summary}>
      <Typography.Title
        level={4}
        style={{
          margin: 0,
          minWidth: 78,
        }}
      >
        In Short
      </Typography.Title>
      {documentToReactComponents(summary.json, richTextOptions)}
    </div>
  );
};

export default ArticleInShorts;
