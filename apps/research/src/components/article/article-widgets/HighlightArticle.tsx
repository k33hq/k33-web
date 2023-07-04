import { ArticleSummaryLinked } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Grid, Space, Typography, theme, Image } from 'antd';
import * as React from 'react';

interface HighlightArticleProps extends ArticleSummaryLinked {}

const { Text, Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;
const { useToken } = theme;

const HighlightArticle: React.FC<HighlightArticleProps> = ({
  subtitle,
  title,
  thumbnail,
  linkedFrom,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();

  return (
    <div
      id="highlighted-article"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div
        id="highlighted-article-body"
        style={{
          display: 'flex',
          padding: '0px 16px 0px 16px',
          flexDirection: 'column',
          gap: 8,
          flex: 1,
        }}
      >
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
            Highlight Article
          </Text>
          <Text
            type="secondary"
            style={{
              fontSize: 'inherit',
            }}
          >
            {formatDateAndTime(
              linkedFrom.articleWebCollection.items[0].publishedDate,
              'day'
            )}
          </Text>
        </Space>
        <Title level={5} style={{ margin: 0 }}>
          {title}
        </Title>
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
        <Image
          src={thumbnail.url}
          alt={thumbnail.description}
          preview={false}
        />
      </div>
    </div>
  );
};

export default HighlightArticle;
