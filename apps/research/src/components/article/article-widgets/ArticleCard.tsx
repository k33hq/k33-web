import { ArticleSummaryWidget } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import {
  Badge,
  Col,
  theme,
  Grid,
  Image,
  Row,
  Space,
  Typography,
  Tag,
} from 'antd';
import Link from 'next/link';
import * as React from 'react';
import styles from './styles.module.scss';
import { EllipsisConfig } from 'antd/es/typography/Base';

const { Text, Paragraph } = Typography;
const { useToken } = theme;

interface ArticleCardProps extends ArticleSummaryWidget {
  isNew?: boolean;
  showTags?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  publishedDate,
  articleSlug,
  article: { title, thumbnail, subtitle, tagsCollection },
  isNew = false,
  showTags = false,
}) => {
  const { md, xl } = Grid.useBreakpoint();
  const {
    token: { fontSizeHeading5, fontSizeSM },
  } = useToken();

  return (
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
          <Space size={[4, 4]} align="baseline" wrap>
            {isNew && <Badge text="New" color="blue" />}
            {xl && showTags && (
              <Space size={[0, 4]} wrap>
                {tagsCollection.items.slice(0, 3).map((tag) => (
                  <Tag key={tag.title}>{tag.title}</Tag>
                ))}
              </Space>
            )}
            <Text
              type="secondary"
              style={{
                fontSize: fontSizeSM,
              }}
            >
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
  );
};

export default ArticleCard;
