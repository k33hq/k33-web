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

export interface ArticleSummary extends RichTextDocument {}
export interface ArticleBody extends RichTextDocument {}
export interface ArticleSlug extends Pick<IArticleWebFields, 'articleSlug'> {}

export interface Article
  extends Pick<IArticleFields, 'title' | 'subtitle' | 'keyPoints'>,
    AuthorCollection<AuthorCompact>,
    TagCollection<ITagFields> {
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
  extends Pick<IArticleWebFields, 'publishedDate' | 'title' | 'articleSlug'>,
    ArticleSeo {
  sections: ISectionFields[];
  article: Omit<Article, 'coverPicture'>;
}

export interface ArticleWebCollection<T extends object> {
  articleWebCollection: {
    items: ReadonlyArray<T>;
  };
}

// level 2s
export interface ArticleWidget
  extends Pick<Article, 'title' | 'subtitle' | 'tagsCollection'> {
  thumbnail: Asset;
}

export interface ArticleWebWidget
  extends Pick<IArticleWebFields, 'publishedDate' | 'articleSlug'> {
  article: Omit<ArticleWidget, 'subtitle'>;
}

export interface ArticleSummaryWidget
  extends Pick<IArticleWebFields, 'publishedDate' | 'articleSlug'> {
  article: ArticleWidget;
}

export interface ArticleSummaryWithCover
  extends Pick<IArticleWebFields, 'publishedDate' | 'articleSlug'> {
  article: Pick<Article, 'title' | 'subtitle' | 'tagsCollection' | 'image'>;
}

export interface ArticleWebWidgetCover
  extends Pick<IArticleWebFields, 'publishedDate' | 'articleSlug'> {
  article: Pick<Article, 'title' | 'subtitle' | 'coverPicture'>;
}

export interface ArticleWebWidgetNormal
  extends Pick<IArticleWebFields, 'publishedDate' | 'articleSlug'> {
  article: Pick<Article, 'title' | 'subtitle'>;
}
