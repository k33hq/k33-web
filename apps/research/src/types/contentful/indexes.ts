import {
  IIndexFields,
  IIndexTokenFields,
  ITokenFields,
} from '../generated/contentful';
import { ArticleWebWidget, ArticleWidget } from './article';
import { Asset } from './global';

export type Token = ITokenFields;
export interface IndexToken extends Omit<IIndexTokenFields, 'token'> {
  token: Token;
}

export interface IndexHome
  extends Pick<IIndexFields, 'name' | 'slug' | 'description' | 'chartBody'> {
  selectedTokensCollection: { items: ReadonlyArray<IndexToken> };
  frameworkArticle: IndexArticleLinked;
  assessmentArticle: IndexArticleLinked;
  chart: Asset;
  highlightArticle: ArticleSummaryLinked;
}

export interface ArticleSummaryLinked
  extends Pick<ArticleWidget, 'title' | 'subtitle' | 'thumbnail'> {
  linkedFrom: {
    articleWebCollection: {
      items: ReadonlyArray<
        Pick<ArticleWebWidget, 'articleSlug' | 'publishedDate'>
      >;
    };
  };
}

export interface IndexArticleLinked extends Pick<ArticleWidget, 'title'> {
  linkedFrom: {
    articleWebCollection: {
      items: ReadonlyArray<
        Pick<ArticleWebWidget, 'articleSlug' | 'publishedDate'>
      >;
    };
  };
}

export interface IndexWebCollection<T extends object> {
  indexCollection: {
    items: ReadonlyArray<T>;
  };
}
