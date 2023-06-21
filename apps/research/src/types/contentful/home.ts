import { SeoData } from './Seo';
import type { ArticleWebWidgetNormal, ArticleWebWidgetCover } from './article';

export interface HomePage {
  seo: SeoData;
  mainArticle: ArticleWebWidgetCover;
  coverArticle1: ArticleWebWidgetCover;
  coverArticle2: ArticleWebWidgetNormal;
  subArticle1: ArticleWebWidgetNormal;
  subArticle2: ArticleWebWidgetNormal;
  subArticle3: ArticleWebWidgetNormal;
  subArticle4: ArticleWebWidgetNormal;
}
