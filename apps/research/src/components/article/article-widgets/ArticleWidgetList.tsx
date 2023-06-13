import { ArticleWebWidget } from '@/types';
import * as React from 'react';
import ArticleWidget from './ArticleWidget';
import { Row } from 'antd';

interface ArticleWidgetListProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const ArticleWidgetList: React.FC<ArticleWidgetListProps> = ({ articles }) => {
  return (
    <Row wrap gutter={[32, 32]}>
      {articles.map((article) => (
        <ArticleWidget key={article.publishedDate} {...article} />
      ))}
    </Row>
  );
};

export default ArticleWidgetList;
