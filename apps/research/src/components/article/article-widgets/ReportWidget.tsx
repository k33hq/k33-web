import { ArticleWebWidget as ArticleWebWidgetType } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Card, Col, Grid, Image, Space, Typography, theme } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import Link from 'next/link';
import styles from './styles.module.scss';

import * as React from 'react';

interface ReportWidgetProps extends ArticleWebWidgetType {}

const { Meta } = Card;
const { Text, Paragraph } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

export const ReportWidget: React.FC<ReportWidgetProps> = ({
  publishedDate,
  articleSlug,
  article: { thumbnail, title },
}) => {
  const {
    token: { fontSizeHeading5 },
  } = useToken();

  const { md } = useBreakpoint();

  return (
    <Col xs={12} sm={12} md={6} xxl={6}>
      <Link
        href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
      >
        <Card
          style={{
            width: '100%',
            overflow: 'hidden',
          }}
          size="small"
          hoverable
          cover={
            <Image
              style={{}}
              src={thumbnail.url}
              preview={false}
              alt={thumbnail.description}
            />
          }
          bordered
        >
          <div
            id="article-summary-information"
            className={styles.articleSummaryBody}
          >
            <Space>
              <Text type="secondary">
                {formatDateAndTime(publishedDate, 'day')}
              </Text>
            </Space>
            <Paragraph
              strong
              style={{
                margin: 0,
                fontSize: fontSizeHeading5,
              }}
              ellipsis={
                md
                  ? ({
                      rows: 2,
                      tooltip: title,
                    } as EllipsisConfig)
                  : ({
                      rows: 2,
                    } as EllipsisConfig)
              }
            >
              {title}
            </Paragraph>
          </div>
        </Card>
      </Link>
    </Col>
  );
};

export default ReportWidget;
