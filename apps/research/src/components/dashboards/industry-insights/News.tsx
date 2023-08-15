import { DefaultRichTextRenderer, newsRichTextOptions } from '@/components';
import { News } from '@/types';
import { Card, Divider, Grid, Typography } from 'antd';
import * as React from 'react';

interface NewsProps {
  news: News;
  hideOtherStores?: boolean;
}

const { Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const News: React.FC<NewsProps> = ({
  news: { topNews, otherNews },
  hideOtherStores = false,
}) => {
  const { xl } = useBreakpoint();
  return (
    <Card
      bordered
      title="Headlines from Weekly Newsletter"
      className="override-list"
    >
      <DefaultRichTextRenderer document={topNews} />
      <>
        {!hideOtherStores && (
          <>
            {xl && (
              <>
                <Divider />
                <Text
                  strong
                  style={{
                    paddingBottom: 16,
                  }}
                >
                  Other News
                </Text>
                <DefaultRichTextRenderer
                  document={otherNews}
                  customOptions={newsRichTextOptions}
                />
              </>
            )}
          </>
        )}
      </>
    </Card>
  );
};

export default News;
