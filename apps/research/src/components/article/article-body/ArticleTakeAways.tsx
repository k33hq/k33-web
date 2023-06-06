import { IArticleFields } from '@/types';
import { List, Space, Typography } from 'antd';
import * as React from 'react';

const ArticleTakeAways: React.FC<Pick<IArticleFields, 'keyPoints'>> = ({
  keyPoints,
}) => {
  if (!keyPoints) return null;
  return (
    <Space.Compact>
      <List
        size="small"
        dataSource={keyPoints}
        renderItem={(point) => <Typography.Text>{point}</Typography.Text>}
      />
    </Space.Compact>
  );
};

export default ArticleTakeAways;
