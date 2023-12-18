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
import { useAnalyticsMutation } from '@/services/analytics';

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

  const [logAnalytics] = useAnalyticsMutation();

  // React.useEffect(() => {
  //   console.log(
  //     !['active', 'ended', 'blocked'].includes(productStatus.state ?? 'loading')
  //   );
  //   console.log(
  //     !['active', 'ended', 'blocked'].includes(
  //       proProductStatus.state ?? 'loading'
  //     )
  //   );
  // }, [proProductStatus, productStatus]);

  const getReportDocument = () => {
    if (
      metadata.sectionsCollection.items.find(
        (item) => item.name === 'industry-reports'
      ) &&
      appState === 'SIGNED_OUT'
    ) {
      return null;
    }

    if (
      reportDocument &&
      (productStatus.state === 'active' ||
        proProductStatus.state === 'active' ||
        productKey === 'pro')
    ) {
      return (
        <Button
          type="primary"
          onClick={() => {
            downloadResource(reportDocument.url);
            //@ts-ignore
            window.gtag(
              'get',
              process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
              'client_id',
              (clientId: string) => {
                // TODO: check if localstorage says cookie-product yes
                const check = localStorage.getItem('cookies-product');
                if (check === 'YES') {
                  logAnalytics({
                    client_id: clientId,
                    events: [
                      {
                        name: 'download_report',
                        params: {
                          report_name: title,
                          section: productSection,
                        },
                      },
                    ],
                  });
                }
              }
            );
          }}
          block
          size="large"
        >
          Download Report
        </Button>
      );
    }

    return null;
  };

  return (
    <>
      {!['active', 'blocked'].includes(productStatus.state ?? 'loading') &&
        !['active', 'blocked'].includes(
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
        {/* {reportDocument && (
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
        )} */}
        {getReportDocument()}
        <Divider style={{ margin: 0 }} />
      </div>
    </>
  );
};

export default ArticleHeader;
