import { richTextOptions } from '@/components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Article } from '@/types';
import * as React from 'react';

interface ArticleBodyProps extends Pick<Article, 'body'> {}

const ArticleBody: React.FC<ArticleBodyProps> = ({ body }) => {
  if (!body) return;
  return (
    <div id="article-in-shorts">
      {documentToReactComponents(body.json, richTextOptions)}
    </div>
  );
};

export default ArticleBody;
