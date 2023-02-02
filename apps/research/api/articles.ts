import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetArticleElementsByCategoriesResponse,
  GetArticleElementsByProductAndCategoriesResponse,
  GetArticlePageResponse,
  GetArticleSlugsByProductsAndCategoriesResponse,
} from '../types';

/**
 * since they are only slugs can be intensive
 */
const GetArticleSlugsByProductsAndCategories = gql`
  query GetArticleSlugsByProductsAndCategories(
    $categorySlug: String!
    $productSlug: String!
  ) {
    articleWebCollection(
      where: {
        category: { categorySlug: $categorySlug }
        product: { productSlug: $productSlug }
      }
    ) {
      items {
        articleSlug
      }
    }
  }
`;

/**
 * gets a minimized version of articles for showing as cards
 * its ordered by the date first published
 */
const GetArticleElementsByProductAndCategories = gql`
  query GetArticleSlugsByProductsAndCategories(
    $categorySlug: String!
    $productSlug: String!
  ) {
    articleWebCollection(
      where: {
        category: { categorySlug: $categorySlug }
        product: { productSlug: $productSlug }
      }
      order: [sys_firstPublishedAt_DESC]
      limit: 10
    ) {
      items {
        category {
          categorySlug
        }

        articleSlug
        thumbnail {
          url
          title
          description
        }
        product {
          productSlug
          branding {
            color
          }
          product {
            title
          }
        }
        article {
          title
          sys {
            firstPublishedAt
          }
        }
      }
    }
  }
`;

/**
 * gets the entire article page
 */
const GetArticlePage = gql`
  query GetArticlePage($articleSlug: String!) {
    articleWebCollection(where: { articleSlug: $articleSlug }, limit: 1) {
      items {
        title
        product {
          productSlug
          branding {
            color
          }
          product {
            title
          }
        }
        article {
          title
          subtitle
          sys {
            firstPublishedAt
          }
          body {
            json
          }
          summary {
            json
          }
          keyPoints
          image {
            url
            title
            description
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
                url
                title
                description
              }
            }
          }
        }
      }
    }
  }
`;

// special queries

const GetArticleElementsByCategories = gql`
  query GetArticleElementsByCategories($categorySlug: String!) {
    articleWebCollection(
      where: { category: { categorySlug: "reports" } }
      limit: 5
      order: [sys_publishedAt_DESC]
    ) {
      items {
        category {
          categorySlug
        }
        articleSlug
        thumbnail {
          url
          title
          description
        }
        product {
          productSlug
          branding {
            color
          }
          product {
            title
          }
        }
        article {
          title
          sys {
            firstPublishedAt
          }
        }
      }
    }
  }
`;

// TODO:

export const getArticleSlugByProductAndCategories = async (
  categorySlug: string,
  productSlug: string
) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleSlugsByProductsAndCategoriesResponse>(
      GetArticleSlugsByProductsAndCategories,
      { categorySlug, productSlug }
    );
  return articleWebCollection.items;
};

export const getArticleElementsByProductAndCategories = async (
  categorySlug: string,
  productSlug: string
) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleElementsByProductAndCategoriesResponse>(
      GetArticleElementsByProductAndCategories,
      { categorySlug, productSlug }
    );

  return articleWebCollection.items;
};

export const getArticlePage = async (articleSlug: string) => {
  const { articleWebCollection } =
    await contentful.request<GetArticlePageResponse>(GetArticlePage, {
      articleSlug,
    });

  return articleWebCollection.items[0];
};

// TODO: add getArticleByCategory
export const getArticleElementByCategories = async (categorySlug: string) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleElementsByCategoriesResponse>(
      GetArticleElementsByCategories,
      {
        categorySlug,
      }
    );
  return articleWebCollection.items;
};
