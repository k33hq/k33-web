import { ArticleWebWidget as ArticleWebWidgetType } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Card, Col, Image, Typography, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as React from 'react';

interface ArticleWidgetProps extends ArticleWebWidgetType {}

const { Meta } = Card;
const { useToken } = theme;
const { Text } = Typography;

export const ArticleWidget: React.FC<ArticleWidgetProps> = ({
  publishedDate,
  articleSlug,
  article: { thumbnail, title },
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  return (
    <Col xs={24} sm={24} md={6}>
      <Link
        href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
      >
        <Card
          style={{
            width: '100%',
            border: 0,
          }}
          hoverable
          cover={
            <Image
              src={thumbnail.url}
              preview={false}
              alt={thumbnail.description}
            />
          }
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
            description={<Text strong>{title}</Text>}
          />
        </Card>
      </Link>
    </Col>
  );
};

export default ArticleWidget;
