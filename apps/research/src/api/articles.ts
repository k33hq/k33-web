import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetArticleElementsByCategoriesResponse,
  GetArticleElementsByProductAndCategoriesResponse,
  GetArticlePageResponse,
  GetArticleSlugsByProductsAndCategoriesResponse,
  GetArticleSlugsResponse,
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

const GetArticleSlugs = gql`
  query {
    articleWebCollection {
      items {
        articleSlug
        category {
          categorySlug
        }

        product {
          productSlug
        }
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
      order: [publishedDate_DESC]
      limit: 10
    ) {
      items {
        category {
          categorySlug
        }

        articleSlug
        publishedDate
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

          thumbnail {
            url
            title
            description
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
        publishedDate
        article {
          title
          subtitle
          body {
            json
            links {
              assets {
                block {
                  url
                  description
                  title
                  sys {
                    id
                  }
                }
              }
            }
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
      order: [publishedDate_DESC]
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
        publishedDate
        article {
          title
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

export const getArticleSlugs = async () => {
  const { articleWebCollection } =
    await contentful.request<GetArticleSlugsResponse>(GetArticleSlugs);
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
