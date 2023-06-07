import { IArticleFields } from '@/types';
import { Typography } from 'antd';
import * as React from 'react';

const ArticleTakeAways: React.FC<Pick<IArticleFields, 'keyPoints'>> = ({
  keyPoints,
}) => {
  if (!keyPoints) return null;
  return (
    <div id="article-take-aways">
      <Typography.Title level={3}>Take Aways</Typography.Title>
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
