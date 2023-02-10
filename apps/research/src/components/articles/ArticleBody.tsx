import { RichText } from '@/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { richTextOptions } from '../rich-text';

interface ArticleBodyProps {
  document: RichText | null;
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ document }) => {
  if (!document) {
    return <></>;
  }
  return <> {documentToReactComponents(document.json, richTextOptions)}</>;
};

export default ArticleBody;
