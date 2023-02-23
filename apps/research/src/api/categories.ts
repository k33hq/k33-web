import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetAllCategorySlugsResponse,
  GetCategoriesAndTheirArticlesResponse,
  GetCategoryElementsResponse,
  GetCategoryPageResponse,
} from '../types';

/**
 * query which gets all categoryPages based on priority attached to each page.
 */
const GetAllCategorySlugs = gql`
  query {
    categoryWebCollection(order: [priority_ASC]) {
      items {
        categorySlug
      }
    }
  }
`;

const GetCategoryElements = gql`
  query {
    categoryWebCollection(order: [priority_ASC]) {
      items {
        categorySlug
        category {
          title
        }
      }
    }
  }
`;

const GetCategoryPage = gql`
  query GetCategoryBySlug($categorySlug: String!) {
    categoryWebCollection(where: { categorySlug: $categorySlug }, limit: 1) {
      items {
        title
        category {
          title
          description
        }
      }
    }
  }
`;

// get categories and their 5 articles
const GetCategoriesAndTheirArticles = gql`
  query {
    categoryWebCollection(order: [priority_ASC]) {
      items {
        categorySlug
        category {
          title
        }
        linkedFrom {
          articleWebCollection(limit: 5) {
            items {
              category {
                categorySlug
              }
              articleSlug
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
                publishedDate
                thumbnail {
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
  }
`;

export const getAllCategorySlugs = async () => {
  const { categoryWebCollection } =
    await contentful.request<GetAllCategorySlugsResponse>(GetAllCategorySlugs);
  return categoryWebCollection.items;
};

export const getCategoryElements = async () => {
  const { categoryWebCollection } =
    await contentful.request<GetCategoryElementsResponse>(GetCategoryElements);
  return categoryWebCollection.items;
};

export const getCategoryPage = async (categorySlug: string) => {
  const { categoryWebCollection } =
    await contentful.request<GetCategoryPageResponse>(GetCategoryPage, {
      categorySlug,
    });

  // Throw error if there is none
  return categoryWebCollection.items[0];
};

export const getCategoriesAndTheirArticles = async () => {
  const { categoryWebCollection } =
    await contentful.request<GetCategoriesAndTheirArticlesResponse>(
      GetCategoriesAndTheirArticles
    );

  return categoryWebCollection.items;
};
