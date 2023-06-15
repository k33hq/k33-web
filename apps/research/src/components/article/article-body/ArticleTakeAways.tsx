import { IArticleFields } from '@/types';
import { Typography } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';

const ArticleTakeAways: React.FC<Pick<IArticleFields, 'keyPoints'>> = ({
  keyPoints,
}) => {
  if (!keyPoints) return null;
  return (
    <div id="article-take-aways" className={styles.summary}>
      <Typography.Title
        level={4}
        style={{
          margin: 0,
          minWidth: 110,
        }}
      >
        Take Aways
      </Typography.Title>
      <ul>
        {keyPoints.map((points) => (
          <li key={points}>
            <Typography.Text>{points}</Typography.Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleTakeAways;
