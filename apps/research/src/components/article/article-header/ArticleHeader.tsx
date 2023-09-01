import { Article, ArticlePage } from '@/types';
import { theme, Divider, Typography, Button } from 'antd';
import * as React from 'react';
import { Image } from 'antd';
import styles from './styles.module.scss';
import ArticleMetaData from '../ArticleMetaData';
import { downloadResource } from '@/utils';
import { useProductInfo } from '@/hooks';
import { appStructure } from '@/config';

const { Title, Text } = Typography;
const { useToken } = theme;

interface ArticleHeaderProps
  extends Pick<Article, 'title' | 'subtitle' | 'image' | 'reportDocument'>,
    Pick<ArticlePage, 'sections' | 'publishedDate'> {}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  subtitle,
  image,
  reportDocument,
  ...metadata
}) => {
  const { productStatus, appState } = useProductInfo(
    appStructure.payments.productId
  );
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
        <Image src={image.url} style={{ margin: 0 }} alt={image.title ?? ''} />
        {image.description && (
          <Typography.Text style={{ fontSize: fontSizeSM }} type="secondary">
            {image.description}
          </Typography.Text>
        )}
      </div>
      {reportDocument && (
        <>
          {productStatus.state === 'active' && (
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
