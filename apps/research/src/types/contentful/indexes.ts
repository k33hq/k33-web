import {
  IIndexFields,
  IIndexTokenFields,
  ITokenFields,
} from '../generated/contentful';
import { ArticleWidget } from './article';
import { Asset } from './global';

export interface Token extends Omit<ITokenFields, 'icon'> {
  icon: Asset;
}
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
  extends Pick<ArticleWidget, 'title' | 'subtitle' | 'horizontalThumbnail' | 'verticalThumbnail' | 'publishedDate' | 'articleSlug'> {}

export interface RelatedArticleSummaryLinked
  extends Pick<ArticleWidget, 'title' | 'subtitle' | 'horizontalThumbnail' | 'publishedDate' | 'articleSlug'> {}

export interface IndexArticleLinked extends Pick<ArticleWidget, 'title' | 'publishedDate' | 'articleSlug'> {}

export interface IndexWebCollection<T extends object> {
  indexCollection: {
    items: ReadonlyArray<T>;
  };
}

export interface TokenValuationIndex
  extends Pick<IIndexFields, 'name' | 'slug' | 'description'> {
  selectedTokensCollection: { items: ReadonlyArray<IndexToken> };
  frameworkArticle: IndexArticleLinked;
  assessmentArticle: IndexArticleLinked;
}
