import { Article, ArticlePage } from '@/types';
import { Divider, Typography } from 'antd';
import * as React from 'react';
import { Image } from 'antd';
import styles from './styles.module.css';
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
        <Image preview={false} src={image.url} alt={image.title ?? ''} />
        <Divider />
      </div>
    </div>
  );
};

export default ArticleHeader;
