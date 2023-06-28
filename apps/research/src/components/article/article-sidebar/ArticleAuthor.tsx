import { AuthorCompact } from '@/types';
import { Space, Avatar, Typography } from 'antd';
import * as React from 'react';

const { Text } = Typography;

const ArticleAuthor: React.FC<AuthorCompact> = ({
  name,
  title,
  profilePicture,
}) => {
  return (
    <Space>
      <Avatar size={'large'} src={profilePicture.url} />
      <Space.Compact direction="vertical" size="middle">
        <Text type="secondary" strong>
          {name}
        </Text>
        <Text type="secondary">{title}</Text>
      </Space.Compact>
    </Space>
  );
};

export default ArticleAuthor;
