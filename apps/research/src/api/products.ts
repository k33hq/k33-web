import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetProductSlugsByCategoryResponse,
  GetProductElementsByCategoryResponse,
  GetProductBySlugResponse,
  GetProductElementsWithArticleElementsByCategoriesResponse,
} from '../types';

/**
 * get product slugs based on the category passed
 */
const GetProductSlugsByCategory = gql`
  query {
    categoryWebCollection {
      items {
        categorySlug
        linkedFrom {
          productWebCollection {
            items {
              productSlug
            }
          }
        }
      }
    }
  }
`;

/**
 * get product elements with category
 */
const GetProductElementsByCategory = gql`
  query GetProductSlugByCategory($categorySlug: String!) {
    productWebCollection(
      where: { categoryWeb: { categorySlug: $categorySlug } }
    ) {
      items {
        productSlug
        categoryWeb {
          categorySlug
        }
        title
        product {
          title
          description
        }
      }
    }
  }
`;

const GetProductBySlug = gql`
  query GetProductBySlug($productSlug: String!) {
    productWebCollection(where: { productSlug: $productSlug }, limit: 1) {
      items {
        title
        branding {
          color
        }
        product {
          title
          description
          image {
            url
            title
            description
          }
          sys {
            id
          }
        }
      }
    }
  }
`;

// specialized queries to for one off functionalities on the page.

/**
 * get product elements with category
 */
const GetProductElementsWithArticleElementsByCategories = gql`
  query GetProductSlugByCategory($categorySlug: String!) {
    productWebCollection(
      where: { categoryWeb: { categorySlug: $categorySlug } }
      limit: 10
    ) {
      items {
        categoryWeb {
          categorySlug
        }
        branding {
          color
        }
        productSlug
        product {
          title
          description
        }
        linkedFrom {
          articleWebCollection(limit: 2) {
            items {
              articleSlug
              product {
                branding {
                  color
                }
              }
              article {
                title
                sys {
                  firstPublishedAt
                }
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

export const getProductSlugsByCategory = async () => {
  const { categoryWebCollection } =
    await contentful.request<GetProductSlugsByCategoryResponse>(
      GetProductSlugsByCategory
    );

  return categoryWebCollection.items.flatMap(({ categorySlug, linkedFrom }) =>
    linkedFrom.productWebCollection.items
      .map(({ productSlug }) => ({
        categorySlug,
        productSlug,
      }))
      .flat()
  );
};

// get products belonging to a particular category
export const getProductElementsByCategory = async (categorySlug: string) => {
  const { productWebCollection } =
    await contentful.request<GetProductElementsByCategoryResponse>(
      GetProductElementsByCategory,
      {
        categorySlug,
      }
    );

  return productWebCollection.items;
};

export const getProductBySlug = async (productSlug: string) => {
  const { productWebCollection } =
    await contentful.request<GetProductBySlugResponse>(GetProductBySlug, {
      productSlug,
    });

  return productWebCollection.items[0];
};

// special responses

export const getProductElementsAndArticleElementsByCategory = async (
  categorySlug: string
) => {
  const { productWebCollection } =
    await contentful.request<GetProductElementsWithArticleElementsByCategoriesResponse>(
      GetProductElementsWithArticleElementsByCategories,
      { categorySlug }
    );

  return productWebCollection.items;
};
