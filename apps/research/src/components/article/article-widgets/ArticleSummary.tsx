import { ArticleSummaryWidget } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import {
  Badge,
  Col,
  Divider,
  Grid,
  Image,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import Link from 'next/link';
import * as React from 'react';
import styles from './styles.module.scss';

const { Text, Title } = Typography;

interface ArticleSummaryProps extends ArticleSummaryWidget {
  isNew?: boolean;
}

const ArticleSummary: React.FC<ArticleSummaryProps> = ({
  publishedDate,
  articleSlug,
  title,
  horizontalThumbnail,
  subtitle,
  tagsCollection,
  isNew = false,
}) => {
  const { sm, md, lg } = Grid.useBreakpoint();
  return (
    <>
      <Col style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Link
          href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
        >
          <Row wrap gutter={[24, 16]} align="middle">
            <Col xs={24} sm={12} order={sm ? 2 : 0}>
              <Image
                loading="lazy"
                style={{
                  width: '100%',
                }}
                preview={false}
                alt={horizontalThumbnail.description}
                src={horizontalThumbnail.url}
              />
            </Col>
            <Col xs={24} sm={12} md={12}>
              <div
                id="article-summary-information"
                className={styles.articleSummaryBody}
              >
                <Space size={4}>
                  {isNew && <Badge text="New" color="blue" />}
                  {lg && (
                    <Space.Compact>
                      {tagsCollection.items.slice(0, 3).map((tag) => (
                        <Tag key={tag.title}>{tag.title}</Tag>
                      ))}
                    </Space.Compact>
                  )}
                  <Text type="secondary">
                    {formatDateAndTime(publishedDate, 'day')}
                  </Text>
                </Space>
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
      </Col>
      <Divider style={{ margin: 0, padding: 0 }} />
    </>
  );
};

export default ArticleSummary;
