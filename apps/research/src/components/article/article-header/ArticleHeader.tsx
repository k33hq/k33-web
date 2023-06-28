import { Article, ArticlePage } from '@/types';
import { theme, Divider, Typography, Button } from 'antd';
import * as React from 'react';
import { Image } from 'antd';
import styles from './styles.module.scss';
import ArticleMetaData from '../ArticleMetaData';
import { downloadResource } from '@/utils';
import { useProductInfo } from '@/hooks';

const { Title, Text } = Typography;
const { useToken } = theme;

interface ArticleHeaderProps
  extends Pick<Article, 'title' | 'subtitle' | 'image' | 'reportDocument'>,
    Pick<ArticlePage, 'section' | 'publishedDate'> {
  productId: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  subtitle,
  image,
  productId,
  reportDocument,
  ...metadata
}) => {
  const [status, state] = useProductInfo(productId);
  const {
    token: { fontSizeSM },
  } = useToken();

  return (
    <div id="article-header" className={styles.header}>
      <ArticleMetaData {...metadata} title={title} />
      <Title level={2} style={{ margin: 0, padding: 0 }}>
        {title}
      </Title>
      <Text type="secondary">{subtitle}</Text>
      <div className={styles.headerImage}>
        <Image
          preview={false}
          src={image.url}
          style={{ margin: 0 }}
          alt={image.title ?? ''}
        />
        {image.description && (
          <Typography.Text style={{ fontSize: fontSizeSM }} type="secondary">
            {image.description}
          </Typography.Text>
        )}
      </div>
      {reportDocument && (
        <>
          {status === 'active' && (
            <Button
              type="primary"
              onClick={() => downloadResource(reportDocument.url)}
              block
              size="large"
            >
              Download Report
            </Button>
          )}
        </>
      )}
      <Divider style={{ margin: 0 }} />
    </div>
  );
};

export default ArticleHeader;
