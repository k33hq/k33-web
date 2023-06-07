import { Article } from '@/types';
import { Divider, Typography } from 'antd';
import * as React from 'react';
import { Image } from 'antd';
import styles from './styles.module.css';

const { Title, Text } = Typography;

interface ArticleHeaderProps
  extends Pick<Article, 'title' | 'subtitle' | 'image'> {}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <div id="article-header" className={styles.header}>
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
