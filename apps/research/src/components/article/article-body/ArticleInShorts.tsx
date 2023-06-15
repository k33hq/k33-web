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
          minWidth: 110,
        }}
      >
        In Short
      </Typography.Title>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        {documentToReactComponents(summary.json, richTextOptions)}
      </div>
    </div>
  );
};

export default ArticleInShorts;
