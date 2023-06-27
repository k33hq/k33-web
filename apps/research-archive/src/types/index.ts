import { Document } from '@contentful/rich-text-types';
import { AssetFields } from 'contentful';
export interface Asset extends Pick<AssetFields, 'title' | 'description'> {
  url: string;
}

// archived stuff

export interface System {
  id: string;
  firstPublishedAt: string;
}

export interface ArchivePageSlug {
  slug: string;
}

export type ArchivePageSlugs = ReadonlyArray<ArchivePageSlug>;

export interface Seo {
  name: string;
  title: string;
  description: string;
  keywords: Readonly<string> | null;
}

export interface Tag {
  name: string;
}

export type Tags = ReadonlyArray<Tag>;

export interface RichText {
  json: Document;
}

export interface Author {
  name: string;
  slug: string;
  title: string;
  image: Asset;
}

export type Authors = ReadonlyArray<Author>;

export interface ArchivedArticleContent {
  subtitle: string;
  image: Asset;
  publishDate: string;
  tagsCollection: {
    items: Tags;
  };
  authorsCollection: {
    items: Authors;
  };
  publicSnippet: RichText;
  content: RichText;
  linkToReport: null | Asset;
}

export interface ArchivePage extends ArchivePageSlug {
  title: string;
  seo: Seo;
  content: ArchivedArticleContent;
}

export interface GetArchivedPageSlugsResponse {
  pageCollection: {
    items: ArchivePageSlugs;
  };
}

export interface GetArchivedPageResponse {
  pageCollection: {
    items: ReadonlyArray<ArchivePage>;
  };
}

// nav

export interface Navigation {
  key: string;
  label: string;
  url: string;
  children?: Array<Navigation>;
}

export interface AppStructure {
  navigation: Array<Navigation>;
}

// export interface PageTab {
//   key: string;
//   label: string;
// }

// export type PageTabs = Array<PageTab>;

export type Navigations = Array<Navigation>;
