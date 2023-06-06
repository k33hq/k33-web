import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetArticlePageResponse,
  GetArticleSeoResponse,
  GetArticleSlugsResponse,
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
