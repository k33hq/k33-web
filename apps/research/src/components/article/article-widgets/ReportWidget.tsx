import { ArticleWebWidget as ArticleWebWidgetType } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Card, Col, Grid, Image, Typography, theme } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import Link from 'next/link';
import * as React from 'react';

interface ReportWidgetProps extends ArticleWebWidgetType {}

const { Meta } = Card;
const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

export const ReportWidget: React.FC<ReportWidgetProps> = ({
  publishedDate,
  articleSlug,
  article: { thumbnail, title },
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();

  const { md } = useBreakpoint();

  return (
    <Col xs={12} sm={12} md={6} xxl={5}>
      <Link
        href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
      >
        <Card
          hoverable
          cover={
            <Image
              src={thumbnail.url}
              preview={false}
              alt={thumbnail.description}
            />
          }
          bordered={false}
        >
          <Meta
            title={
              <Text
                type="secondary"
                style={{
                  fontSize: fontSizeSM,
                }}
              >
                {formatDateAndTime(publishedDate, 'day')}
              </Text>
            }
            description={
              <Text
                strong
                ellipsis={md ? ({ tooltip: title } as EllipsisConfig) : false}
              >
                {title}
              </Text>
            }
          />
        </Card>
      </Link>
    </Col>
  );
};

export default ReportWidget;
