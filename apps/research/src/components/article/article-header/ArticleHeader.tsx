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
      <Title level={2} editable={false}>
        {title}
      </Title>
      <Text type="secondary">{subtitle}</Text>
      <div className={styles.headerImage}>
        <Card
          cover={
            <Image preview={false} src={image.url} alt={image.title ?? ''} />
          }
          style={{
            border: 0,
          }}
        >
          <Card.Meta description={image.description} />
        </Card>
        <Divider />
      </div>
    </div>
  );
};

export default ArticleHeader;
