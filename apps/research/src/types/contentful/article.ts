import { TagCollection } from './tags';
import {
  IArticleFields,
  ISectionFields,
  ITagFields,
} from '../generated/contentful';
import { AuthorCompact, AuthorsCollection } from './author';
import { Asset, RichTextDocument } from './global';
import { SeoData } from './Seo';
import { RelatedArticleSummaryLinked } from './indexes';

export interface ArticleSummary extends RichTextDocument {}
export interface ArticleBody extends RichTextDocument {}
export interface ArticleSlug extends Pick<IArticleFields, 'articleSlug'> {}

export interface Article
  extends Pick<
      IArticleFields,
      'title' | 'subtitle' | 'keyPoints' | 'publishedDate' | 'articleSlug'
    >,
    AuthorsCollection<AuthorCompact>,
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

export interface ArticlePage extends Omit<Article, 'coverPicture'> {
  seo: SeoData;
  sectionsCollection: {
    items: ISectionFields[];
  };
}

export interface ArticleCollection<T extends object> {
  articleCollection: {
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
  extends Pick<
    Article,
    'title' | 'subtitle' | 'tagsCollection' | 'publishedDate' | 'articleSlug'
  > {
  horizontalThumbnail: Asset;
  verticalThumbnail: Asset;
}

export interface ArticleWebWidget extends Omit<ArticleWidget, 'subtitle'> {}

export interface ArticleSummaryWidget
  extends Omit<ArticleWidget, 'verticalThumbnail'> {}

export interface ArticleSummaryWithCover
  extends Pick<
    Article,
    | 'title'
    | 'subtitle'
    | 'tagsCollection'
    | 'image'
    | 'publishedDate'
    | 'articleSlug'
  > {}

export interface ArticleWidgetCover
  extends Pick<
    Article,
    'title' | 'subtitle' | 'coverPicture' | 'publishedDate' | 'articleSlug'
  > {}

export interface ArticleWidgetNormal
  extends Pick<
    Article,
    'title' | 'subtitle' | 'publishedDate' | 'articleSlug'
  > {}
