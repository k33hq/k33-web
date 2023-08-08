import { SeoData } from './Seo';
import type { ArticleWidgetNormal, ArticleWidgetCover } from './article';

export interface HomePage {
  seo: SeoData;
  mainArticle: ArticleWidgetCover;
  coverArticle1: ArticleWidgetCover;
  coverArticle2: ArticleWidgetNormal;
  subArticle1: ArticleWidgetNormal;
  subArticle2: ArticleWidgetNormal;
  subArticle3: ArticleWidgetNormal;
  subArticle4: ArticleWidgetNormal;
}
