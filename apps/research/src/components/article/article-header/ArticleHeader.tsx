import { Article, ArticlePage } from '@/types';
import { Card, Divider, Typography } from 'antd';
import * as React from 'react';
import { Image } from 'antd';
import styles from './styles.module.scss';
import ArticleMetaData from '../ArticleMetaData';

const { Title, Text } = Typography;

interface ArticleHeaderProps
  extends Pick<Article, 'title' | 'subtitle' | 'image'>,
    Pick<ArticlePage, 'section' | 'publishedDate'> {}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  subtitle,
  image,
  ...metadata
}) => {
  return (
    <div id="article-header" className={styles.header}>
      <ArticleMetaData {...metadata} />
      <Title level={2} style={{ margin: 0, padding: 0 }}>
        {title}
      </Title>
      <Text type="secondary">{subtitle}</Text>
      <div className={styles.headerImage}>
        <Image preview={false} src={image.url} alt={image.title ?? ''} />
        {image.description && (
          <Typography.Text type="secondary">
            {image.description}
          </Typography.Text>
        )}
      </div>
      <Divider />
    </div>
  );
};

export default ArticleHeader;
