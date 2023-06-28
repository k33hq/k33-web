import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetArticlePageResponse,
  GetArticleSeoResponse,
  GetArticleSlugsResponse,
  GetArticleSummaryWidgetResponse,
  GetArticleSummaryWithCoverResponse,
  GetArticleWebWidgetsResponse,
} from '@/types';
import {
  PublicSnippetFragment,
  ArticleBodyFragment,
  SeoFragment,
  AssetFragment,
} from './fragments';

const GetArticleSlugs = gql`
  query {
    articleWebCollection {
      items {
        articleSlug
      }
    }
  }
`;

const GetArticleSeo = gql`
  query GetArticlePage($articleSlug: String!) {
    articleWebCollection(where: { articleSlug: $articleSlug }, limit: 1) {
      items {
        title
        seo {
          ...seo
        }
        article {
          title
          subtitle
          image {
            ...asset
          }
        }
      }
    }
  }
  ${AssetFragment}
  ${SeoFragment}
`;

/**
 * gets the entire article page
 */
const GetArticlePage = gql`
  query GetArticlePage($articleSlug: String!) {
    articleWebCollection(where: { articleSlug: $articleSlug }, limit: 1) {
      items {
        title
        seo {
          ...seo
        }
        section {
          name
        }
        publishedDate
        articleSlug
        article {
          title
          subtitle
          tagsCollection {
            items {
              title
            }
          }
          publicSnippet {
            ...publicSnippet
          }
          body {
            ...articleBody
          }
          summary {
            json
          }
          keyPoints
          image {
            ...asset
          }
          reportDocument {
            url
            title
          }
          authorsCollection {
            items {
              name
              title
              profilePicture {
                ...asset
              }
            }
          }
        }
      }
    }
  }
  ${AssetFragment}
  ${SeoFragment}
  ${PublicSnippetFragment}
  ${ArticleBodyFragment}
`;

const GetArticleWebWidgets = gql`
  query GetArticleWebWidgets($section: String!, $limit: Int!) {
    articleWebCollection(
      where: { section: { name: $section } }
      order: [publishedDate_DESC]
      limit: $limit
    ) {
      items {
        article {
          thumbnail {
            ...asset
          }
          title
          tagsCollection {
            items {
              title
            }
          }
        }
        articleSlug
        publishedDate
      }
    }
  }
  ${AssetFragment}
`;

const GetArticleWebSummaryWidgets = gql`
  query GetArticleWebSummaryWidgets($section: String!, $limit: Int!) {
    articleWebCollection(
      where: { section: { name: $section } }
      order: [publishedDate_DESC]
      limit: $limit
    ) {
      items {
        article {
          thumbnail {
            ...asset
          }
          title
          subtitle
          tagsCollection {
            items {
              title
            }
          }
        }
        articleSlug
        publishedDate
      }
    }
  }
  ${AssetFragment}
`;

const GetArticleSummaryWithCover = gql`
  query GetArticleSummaryWithCover($section: String!, $limit: Int!) {
    articleWebCollection(
      where: { section: { name: $section } }
      order: [publishedDate_DESC]
      limit: $limit
    ) {
      items {
        article {
          image {
            ...asset
          }
          title
          subtitle
          tagsCollection {
            items {
              title
            }
          }
        }
        articleSlug
        publishedDate
      }
    }
  }
  ${AssetFragment}
`;

export const getArticleSlugs = async () => {
  const { articleWebCollection } =
    await contentful.request<GetArticleSlugsResponse>(GetArticleSlugs);
  return articleWebCollection.items;
};

export const getArticleSeo = async (articleSlug: string) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleSeoResponse>(GetArticleSeo, {
      articleSlug,
    });
  return articleWebCollection.items[0];
};

export const getArticlePage = async (articleSlug: string) => {
  const { articleWebCollection } =
    await contentful.request<GetArticlePageResponse>(GetArticlePage, {
      articleSlug,
    });

  return articleWebCollection.items[0];
};

export const getArticleWebWidgets = async (
  section: string,
  limit: number = 100
) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleWebWidgetsResponse>(
      GetArticleWebWidgets,
      {
        section,
        limit,
      }
    );
  return articleWebCollection.items;
};

export const getArticleSummaryWidgets = async (
  section: string,
  limit: number = 100
) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleSummaryWidgetResponse>(
      GetArticleWebSummaryWidgets,
      {
        section,
        limit,
      }
    );
  return articleWebCollection.items;
};

export const getArticleSummaryWithCoverWidgets = async (
  section: string,
  limit: number = 100
) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleSummaryWithCoverResponse>(
      GetArticleSummaryWithCover,
      {
        section,
        limit,
      }
    );
  return articleWebCollection.items;
};
