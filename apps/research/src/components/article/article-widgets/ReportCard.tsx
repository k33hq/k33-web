import * as React from 'react';
import { ArticleWebWidget as ArticleWidgetType } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Card, Grid, Image, Space, Typography, theme } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import Link from 'next/link';
import styles from './styles.module.scss';

const { Text, Paragraph } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const ReportCard: React.FC<ArticleWidgetType> = ({
  verticalThumbnail,
  title,
  publishedDate,
  articleSlug,
}) => {
  const {
    token: { fontSizeHeading5 },
  } = useToken();

  const { md, xs } = useBreakpoint();
  return (
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
            src={verticalThumbnail.url}
            preview={false}
            alt={verticalThumbnail.description}
          />
        }
        bordered
      >
        <div
          id="article-summary-information"
          style={{
            minHeight: 96,
          }}
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
  );
};

export default ReportCard;
