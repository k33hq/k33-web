import { TagCollection } from './tags';
import {
  IArticleFields,
  IArticleWebFields,
  ISectionFields,
  ITagFields,
} from '../generated/contentful';
import { AuthorCollection, AuthorCompact } from './author';
import { Asset, RichTextDocument } from './global';
import { SeoData } from './Seo';
import { RelatedArticleSummaryLinked } from './indexes';

export interface ArticleSummary extends RichTextDocument {}
export interface ArticleBody extends RichTextDocument {}
export interface ArticleSlug extends Pick<IArticleWebFields, 'articleSlug'> {}

export interface Article
  extends Pick<IArticleFields, 'title' | 'subtitle' | 'keyPoints' | 'publishedDate'>,
    AuthorCollection<AuthorCompact>,
    TagCollection<ITagFields>,
    RecommendedArticle<RelatedArticleSummaryLinked>,
    RelatedArticles<RelatedArticleSummaryLinked> {
  image: Asset;
  summary: ArticleSummary | undefined;
  body: ArticleBody | undefined;
  publicSnippet: ArticleBody;
  reportDocument: Asset;
  coverPicture: Asset;
}

export interface ArticleSeo extends Pick<IArticleWebFields, 'title'> {
  seo: SeoData;
  article: Pick<Article, 'title' | 'subtitle' | 'image'>;
}

export interface ArticlePage
  extends Pick<IArticleWebFields, 'title' | 'articleSlug'>,
    Pick<IArticleFields, 'publishedDate'>,
    ArticleSeo {
  sections: ISectionFields[];
  article: Omit<Article, 'coverPicture'>;
}

export interface ArticleWebCollection<T extends object> {
  articleWebCollection: {
    items: ReadonlyArray<T>;
  };
}

export interface RecommendedArticle<T extends object> {
  recommendedArticlesCollection: {
    items: ReadonlyArray<T>;
  };
}

export interface RelatedArticles<T extends object> {
  relatedArticlesCollection: {
    items: ReadonlyArray<T>;
  };
}

// level 2s
export interface ArticleWidget
  extends Pick<Article, 'title' | 'subtitle' | 'tagsCollection' | 'publishedDate'> {
  horizontalThumbnail: Asset;
  verticalThumbnail: Asset;
}

export interface ArticleWebWidget
  extends Pick<IArticleWebFields, 'articleSlug'> {
  article: Omit<ArticleWidget, 'subtitle'>;
}

export interface ArticleSummaryWidget
  extends Pick<IArticleWebFields, 'articleSlug'> {
  article: Omit<ArticleWidget, 'verticalThumbnail'>;
}

export interface ArticleSummaryWithCover
  extends Pick<IArticleWebFields, 'articleSlug'> {
  article: Pick<Article, 'title' | 'subtitle' | 'tagsCollection' | 'image' | 'publishedDate'>;
}

export interface ArticleWebWidgetCover
  extends Pick<IArticleWebFields, 'articleSlug'> {
  article: Pick<Article, 'title' | 'subtitle' | 'coverPicture' | 'publishedDate'>;
}

export interface ArticleWebWidgetNormal
  extends Pick<IArticleWebFields, 'articleSlug'> {
  article: Pick<Article, 'title' | 'subtitle' | 'publishedDate'>;
}
