import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetArticlePageResponse,
  GetArticleSlugsResponse,
  GetArticleSummaryWidgetResponse,
  GetArticleSummaryWithCoverResponse,
  GetArticleWidgetsResponse,
} from '@/types';
import {
  PublicSnippetFragment,
  ArticleBodyFragment,
  SeoFragment,
  AssetFragment,
} from './fragments';

const GetArticleSlugs = gql`
  query {
    articleCollection(limit: 11000) {
      items {
        articleSlug
      }
    }
  }
`;

/**
 * gets the entire article page
 */
const GetArticlePage = gql`
  query GetArticlePage($articleSlug: String!) {
    articleCollection(where: { articleSlug: $articleSlug }, limit: 1) {
      items {
        title
        seo {
          ...seo
        }
        sectionsCollection(limit: 1) {
          items {
            name
          }
        }
        articleSlug
        subtitle
        publishedDate
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
        recommendedArticlesCollection {
          items {
            title
            subtitle
            horizontalThumbnail {
              url
              description
            }
            publishedDate
            articleSlug
          }
        }
        relatedArticlesCollection {
          items {
            title
            subtitle
            horizontalThumbnail {
              url
              description
            }
            publishedDate
            articleSlug
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

const GetArticleWidgets = gql`
  query GetArticleWidgets($section: String!, $limit: Int!) {
    articleCollection(
      where: { sections: { name: $section } }
      order: [publishedDate_DESC]
      limit: $limit
    ) {
      items {
        horizontalThumbnail {
          ...asset
        }
        verticalThumbnail {
          ...asset
        }
        title
        publishedDate
        tagsCollection {
          items {
            title
          }
        }
        articleSlug
      }
    }
  }
  ${AssetFragment}
`;

const GetArticleSummaryWidgets = gql`
  query GetArticleSummaryWidgets($section: String!, $limit: Int!) {
    articleCollection(
      where: { sections: { name: $section } }
      order: [publishedDate_DESC]
      limit: $limit
    ) {
      items {
        horizontalThumbnail {
          ...asset
        }
        title
        subtitle
        publishedDate
        tagsCollection {
          items {
            title
          }
        }
        articleSlug
      }
    }
  }
  ${AssetFragment}
`;

const GetArticleSummaryWithCover = gql`
  query GetArticleSummaryWithCover($section: String!, $limit: Int!) {
    articleCollection(
      where: { sections: { name: $section } }
      order: [publishedDate_DESC]
      limit: $limit
    ) {
      items {
        image {
          ...asset
        }
        title
        subtitle
        publishedDate
        tagsCollection {
          items {
            title
          }
        }
        articleSlug
      }
    }
  }
  ${AssetFragment}
`;

const GetArticleWidgetByAuthors = gql`
  query GetArticleWidgetByAuthors(
    $names: [String!]!
    $exclude: String!
    $limit: Int!
  ) {
    articleCollection(
      where: { authors: { name_in: $names }, articleSlug_not: $exclude }
      order: [publishedDate_DESC]
      limit: $limit
    ) {
      items {
        horizontalThumbnail {
          ...asset
        }
        verticalThumbnail {
          ...asset
        }
        title
        publishedDate
        tagsCollection {
          items {
            title
          }
        }
        articleSlug
      }
    }
  }
  ${AssetFragment}
`;

export const getArticleSlugs = async () => {
  const { articleCollection } =
    await contentful.request<GetArticleSlugsResponse>(GetArticleSlugs);
  return articleCollection.items;
};

export const getArticlePage = async (articleSlug: string) => {
  const { articleCollection } =
    await contentful.request<GetArticlePageResponse>(GetArticlePage, {
      articleSlug,
    });

  return articleCollection.items[0];
};

export const getArticleWidgets = async (
  section: string,
  limit: number = 100
) => {
  const { articleCollection } =
    await contentful.request<GetArticleWidgetsResponse>(GetArticleWidgets, {
      section,
      limit,
    });
  return articleCollection.items;
};

export const getArticleSummaryWidgets = async (
  section: string,
  limit: number = 100
) => {
  const { articleCollection } =
    await contentful.request<GetArticleSummaryWidgetResponse>(
      GetArticleSummaryWidgets,
      {
        section,
        limit,
      }
    );
  return articleCollection.items;
};

export const getArticleSummaryWithCoverWidgets = async (
  section: string,
  limit: number = 100
) => {
  const { articleCollection } =
    await contentful.request<GetArticleSummaryWithCoverResponse>(
      GetArticleSummaryWithCover,
      {
        section,
        limit,
      }
    );
  return articleCollection.items;
};

export const getArticleWidgetsByAuthors = async (
  names: Array<string>,
  exclude: string,
  limit: number = 5
) => {
  const { articleCollection } =
    await contentful.request<GetArticleWidgetsResponse>(
      GetArticleWidgetByAuthors,
      {
        names,
        exclude,
        limit,
      }
    );
  return articleCollection.items;
};
