import { ArticleSummaryLinked } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Grid, Space, Typography, theme, Image } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

interface HighlightArticleProps extends ArticleSummaryLinked {}

const { Text, Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;
const { useToken } = theme;

const HighlightArticle: React.FC<HighlightArticleProps> = ({
  subtitle,
  title,
  horizontalThumbnail,
  publishedDate,
  articleSlug,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();

  return (
    <div id="highlighted-article" className={styles.highlightedArticle}>
      <div id="highlighted-article-body">
        <Space
          size={8}
          direction="horizontal"
          style={{
            fontSize: fontSizeSM,
          }}
        >
          <Text
            strong
            style={{
              fontSize: 'inherit',
            }}
          >
            Highlighted Article
          </Text>
          <Text
            type="secondary"
            style={{
              fontSize: 'inherit',
            }}
          >
            {formatDateAndTime(publishedDate, 'day')}
          </Text>
        </Space>
        <Link
          href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
        >
          <Title level={5} style={{ margin: 0 }}>
            {title}
          </Title>
        </Link>
        <Paragraph
          type="secondary"
          ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}
        >
          {subtitle}
        </Paragraph>
      </div>
      <div
        id="highlighted-article-image"
        style={{
          flex: 1,
        }}
      >
        <Link
          href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
        >
          <Image
            loading="lazy"
            src={horizontalThumbnail.url}
            alt={horizontalThumbnail.description}
            preview={false}
          />
        </Link>
      </div>
    </div>
  );
};

export default HighlightArticle;
