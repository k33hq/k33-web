import { ArchivePage } from '@/types';
import * as React from 'react';
import { ArticleHeader } from './article-header';
import { ArticleBody } from './article-body';

interface ArticleProps extends ArchivePage {}

// TODO: extract the subscription product call to rtk toolkit soo we have the productID and price in the store when we need them
const Article: React.FC<ArticleProps> = ({
  title,
  content: { subtitle, image, linkToReport, content: body, publishDate },
}) => {
  return (
    <>
      <ArticleHeader
        publishDate={publishDate}
        title={title}
        linkToReport={linkToReport}
        subtitle={subtitle}
        image={image}
      />
      <ArticleBody content={body} />
    </>
  );
};

export default Article;
