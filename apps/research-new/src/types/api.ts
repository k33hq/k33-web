import {
  ArticleSlug,
  ArticlePage,
  ArticleWebCollection,
  ArticleSeo,
} from './article';

export type GetArticleSlugsResponse = ArticleWebCollection<ArticleSlug>;
export type GetArticleSeoResponse = ArticleWebCollection<ArticleSeo>;
export type GetArticlePageResponse = ArticleWebCollection<ArticlePage>;
