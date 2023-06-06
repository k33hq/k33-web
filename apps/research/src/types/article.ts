import {
  IArticleFields,
  IArticleWebFields,
  ISectionFields,
  ISeoMetadataFields,
} from './generated/contentful';

export interface ArticleSlug extends Pick<IArticleWebFields, 'articleSlug'> {}

interface Article
  extends Pick<
    IArticleFields,
    | 'title'
    | 'subtitle'
    | 'image'
    | 'body'
    | 'publicSnippet'
    | 'summary'
    | 'keyPoints'
    | 'reportDocument'
  > {}

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
