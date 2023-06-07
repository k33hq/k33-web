import { ArticlePage } from '@/types';
import { ShareAltOutlined } from '@ant-design/icons';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Button, Divider, Space, Typography } from 'antd';

import * as React from 'react';

interface ArticleMetaDataProps
  extends Pick<ArticlePage, 'section' | 'publishedDate'> {}

const { Text } = Typography;

const ArticleMetaData: React.FC<ArticleMetaDataProps> = ({
  section,
  publishedDate,
}) => {
  return (
    <Space size={4} split={<Divider type="vertical" />}>
      <Text strong>{section.name.split('/')[0]}</Text>
      <Text type="secondary">{formatDateAndTime(publishedDate, 'day')}</Text>
      <Text type="secondary">3 min read</Text>
      <Button type="text" icon={<ShareAltOutlined />}>
        Share
      </Button>
    </Space>
  );
};

export default ArticleMetaData;
