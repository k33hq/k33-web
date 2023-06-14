import { ArticleSummaryWidget } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Badge, Col, theme, Grid, Image, Row, Space, Typography } from 'antd';
import Link from 'next/link';
import * as React from 'react';
import styles from './styles.module.scss';
import { EllipsisConfig } from 'antd/es/typography/Base';

const { Text, Title, Paragraph } = Typography;
const { useToken } = theme;

interface ArticleSummaryProps extends ArticleSummaryWidget {
  isNew?: boolean;
}

const ArticleSummary: React.FC<ArticleSummaryProps> = ({
  publishedDate,
  articleSlug,
  article: { title, thumbnail, subtitle },
  isNew = false,
}) => {
  const { sm, md } = Grid.useBreakpoint();
  const {
    token: { fontSizeHeading5 },
  } = useToken();
  return (
    <Col xs={24} sm={24} md={6}>
      <Row gutter={[0, md ? 24 : 8]} align="middle">
        <Col xs={24}>
          <Link
            href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
          >
            <Image
              style={{
                width: '100%',
              }}
              preview={false}
              alt={thumbnail.description}
              src={thumbnail.url}
            />
          </Link>
        </Col>

        <Col xs={24}>
          <div
            id="article-summary-information"
            className={styles.articleSummaryBody}
          >
            <Space>
              {isNew && <Badge text="New" color="blue" />}
              <Text type="secondary">
                {formatDateAndTime(publishedDate, 'day')}
              </Text>
            </Space>
            <Link
              href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
            >
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
                        rows: 3,
                      } as EllipsisConfig)
                }
              >
                {title}
              </Paragraph>
            </Link>
            <Paragraph
              type="secondary"
              ellipsis={
                md
                  ? ({
                      rows: 2,
                      expandable: true,
                      symbol: 'more',
                    } as EllipsisConfig)
                  : ({
                      rows: 3,
                      expandable: true,
                      symbol: 'more',
                    } as EllipsisConfig)
              }
            >
              {subtitle}
            </Paragraph>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default ArticleSummary;
