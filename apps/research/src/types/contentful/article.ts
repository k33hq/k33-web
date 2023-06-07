import { TagCollection } from './tags';
import {
  IArticleFields,
  IArticleWebFields,
  ISectionFields,
  ISeoMetadataFields,
  ITagFields,
} from '../generated/contentful';
import { AuthorCollection, AuthorCompact } from './author';
import { Asset } from './global';
import { Document } from '@contentful/rich-text-types';

export interface ArticleSummary {
  json: Document;
}

export interface ArticleSlug extends Pick<IArticleWebFields, 'articleSlug'> {}

export interface Article
  extends Pick<
      IArticleFields,
      | 'title'
      | 'subtitle'
      | 'body'
      | 'publicSnippet'
      | 'keyPoints'
      | 'reportDocument'
    >,
    AuthorCollection<AuthorCompact>,
    TagCollection<ITagFields> {
  image: Asset;
  summary: ArticleSummary | undefined;
}

export interface ArticleSeo extends Pick<IArticleWebFields, 'title'> {
  seo: ISeoMetadataFields;
  article: Pick<Article, 'title' | 'subtitle' | 'image'>;
}

export interface ArticlePage
  extends Pick<IArticleWebFields, 'publishedDate' | 'title'>,
    ArticleSeo {
  section: ISectionFields;
  article: Article;
}

export interface ArticleWebCollection<T extends object> {
  articleWebCollection: {
    items: ReadonlyArray<T>;
  };
}
