import { DefaultRichTextRenderer, newsRichTextOptions } from '@/components';
import { News } from '@/types';
import { Card, Divider, Grid, Typography } from 'antd';
import * as React from 'react';

interface NewsProps {
  news: News;
}

const { Paragraph } = Typography;
const { useBreakpoint } = Grid;

const News: React.FC<NewsProps> = ({ news: { topNews, otherNews } }) => {
  const { xl } = useBreakpoint();
  return (
    <Card bordered title="Top Stories" className="override-list">
      <DefaultRichTextRenderer document={topNews} />
      {xl && (
        <>
          <Divider />
          <DefaultRichTextRenderer
            document={otherNews}
            customOptions={newsRichTextOptions}
          />
        </>
      )}
    </Card>
  );
};

export default News;
