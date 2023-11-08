import { Article, ArticlePage } from '@/types';
import { theme, Divider, Typography, Button } from 'antd';
import * as React from 'react';
import { Image } from 'antd';
import styles from './styles.module.scss';
import ArticleMetaData from '../ArticleMetaData';
import { downloadResource, getProductSection, sectionKeys } from '@/utils';
import { useProductInfo } from '@/hooks';
import { appStructure } from '@/config';
import { TopPromotion } from '@/components';

const { Title, Text } = Typography;
const { useToken } = theme;

interface ArticleHeaderProps
  extends Pick<Article, 'title' | 'subtitle' | 'image' | 'reportDocument'>,
    Pick<ArticlePage, 'sectionsCollection' | 'publishedDate'> {}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  subtitle,
  image,
  reportDocument,
  ...metadata
}) => {
  const { productStatus: proProductStatus, appState } = useProductInfo(
    appStructure.payments.pro.productId
  );
  const {
    token: { fontSizeSM },
  } = useToken();

  const productSection =
    getProductSection(metadata.sectionsCollection)?.name ?? '';
  const productKey = sectionKeys[productSection] ?? 'pro';

  const { productStatus } = useProductInfo(
    appStructure.payments[productKey].productId
  );

  React.useEffect(() => {
    console.log(
      !['active', 'ended', 'blocked'].includes(productStatus.state ?? 'loading')
    );
    console.log(
      !['active', 'ended', 'blocked'].includes(
        proProductStatus.state ?? 'loading'
      )
    );
  }, [proProductStatus, productStatus]);

  return (
    <>
      {!['active', 'ended', 'blocked'].includes(
        productStatus.state ?? 'loading'
      ) &&
        !['active', 'ended', 'blocked'].includes(
          proProductStatus.state ?? 'loading'
        ) && <TopPromotion />}
      <div id="article-header" className={styles.header}>
        <ArticleMetaData {...metadata} title={title} />
        <Title level={2} style={{ margin: 0, padding: 0 }}>
          {title}
        </Title>
        <Text type="secondary">{subtitle}</Text>
        <div className={styles.headerImage}>
          <Image
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
            {(productStatus.state === 'active' ||
              proProductStatus.state === 'active' ||
              productKey === 'pro') && (
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
    </>
  );
};

export default ArticleHeader;
