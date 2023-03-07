import { gql } from 'graphql-request';
import { contentful } from './client';
import { GetHomePageElementsResponse } from '../types';

const GetHomePageElements = gql`
  query {
    homePage(id: "1ZbMXiefkGuOYeDaIo7WNX") {
      mainArticle {
        articleSlug
        publishedDate
        category {
          categorySlug
        }
        product {
          productSlug
          branding {
            color
          }
          product {
            title
            description
          }
        }
        article {
          title
          subtitle
          coverPicture {
            url
            title
          }
        }
      }

      subArticle1 {
        articleSlug
        publishedDate
        category {
          categorySlug
        }
        product {
          productSlug
          branding {
            color
          }
          product {
            title
            description
          }
        }
        article {
          title
          subtitle
          coverPicture {
            url
            title
          }
        }
      }

      subArticle2 {
        articleSlug
        publishedDate
        category {
          categorySlug
        }
        product {
          productSlug
          branding {
            color
          }
          product {
            title
            description
          }
        }
        article {
          title
          subtitle
          coverPicture {
            url
            title
          }
        }
      }
      subArticle3 {
        articleSlug
        publishedDate
        category {
          categorySlug
        }
        product {
          productSlug
          branding {
            color
          }
          product {
            title
            description
          }
        }
        article {
          title
          subtitle
          coverPicture {
            url
            title
          }
        }
      }
      subArticle4 {
        articleSlug
        publishedDate
        category {
          categorySlug
        }
        product {
          productSlug
          branding {
            color
          }
          product {
            title
            description
          }
        }
        article {
          title
          subtitle
          coverPicture {
            url
            title
          }
        }
      }
    }
  }
`;

export const getHomePageElements = async () => {
  const { homePage } = await contentful.request<GetHomePageElementsResponse>(
    GetHomePageElements
  );

  return homePage;
};
