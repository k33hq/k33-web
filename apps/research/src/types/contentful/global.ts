import { Document } from '@contentful/rich-text-types';
import { AssetFields } from 'contentful';

export interface Asset extends Pick<AssetFields, 'title' | 'description'> {
  url: string;
}

export interface RichTextDocument {
  json: Document;
}

export interface News {
  /** Top News */
  topNews: RichTextDocument;

  /** Other News */
  otherNews: RichTextDocument;
}
