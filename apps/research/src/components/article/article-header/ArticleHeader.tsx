import { Article } from '@/types';
import { Divider, Grid, Space, Typography } from 'antd';
import * as React from 'react';
import { Image } from 'antd';

const { Title, Text } = Typography;

interface ArticleHeaderProps
  extends Pick<Article, 'title' | 'subtitle' | 'image'> {}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  subtitle,
  image,
}) => {
  const { lg } = Grid.useBreakpoint();
  return (
    <Space direction="vertical" size={lg ? 24 : 16}>
      <Title level={2} editable={false}>
        {title}
      </Title>
      <Text type="secondary">{subtitle}</Text>
      <Image preview={false} src={image.url} alt={image.title ?? ''} />
      <Divider />
    </Space>
  );
};

export default ArticleHeader;
