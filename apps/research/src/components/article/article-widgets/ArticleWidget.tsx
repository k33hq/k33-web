import { ArticleWebWidget as ArticleWebWidgetType } from '@/types';
import { Card, Col, Image } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';

interface ArticleWidgetProps extends ArticleWebWidgetType {}

const { Meta } = Card;

export const ArticleWidget: React.FC<ArticleWidgetProps> = ({
  publishedDate,
  articleSlug,
  article: { thumbnail, title },
}) => {
  const router = useRouter();
  return (
    <Col xs={22} sm={22} md={6}>
      <Card
        onClick={() =>
          router.push(
            `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`
          )
        }
        cover={
          <Image
            src={thumbnail.url}
            alt={thumbnail.description}
            preview={false}
          />
        }
        style={{
          border: 0,
        }}
      >
        <Meta title={title} />
      </Card>
    </Col>
  );
};

export default ArticleWidget;
