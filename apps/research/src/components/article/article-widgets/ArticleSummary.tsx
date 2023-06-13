import { ArticleSummaryWidget } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Col, Divider, Grid, Image, Row, Typography } from 'antd';
import Link from 'next/link';
import * as React from 'react';
import styles from './styles.module.scss';

const { Text, Title } = Typography;

const ArticleSummary: React.FC<ArticleSummaryWidget> = ({
  publishedDate,
  articleSlug,
  article: { title, thumbnail, subtitle },
}) => {
  const { sm, md } = Grid.useBreakpoint();
  return (
    <Col>
      <Link
        href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
      >
        <Row wrap gutter={16} align="middle">
          <Col xs={24} sm={12} order={sm ? 2 : 0}>
            <Image
              style={{
                width: '100%',
              }}
              preview={false}
              alt={thumbnail.description}
              src={thumbnail.url}
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <div
              id="article-summary-information"
              className={styles.articleSummaryBody}
            >
              <Text type="secondary">
                {formatDateAndTime(publishedDate, 'day')}
              </Text>
              <Title
                ellipsis={false}
                level={md ? 2 : 5}
                style={{
                  margin: 0,
                }}
              >
                {title}
              </Title>
              {md && <Text>{subtitle}</Text>}
            </div>
          </Col>
        </Row>
      </Link>
      <Divider />
    </Col>
  );
};

export default ArticleSummary;
