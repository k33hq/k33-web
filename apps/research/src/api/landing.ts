import { gql } from 'graphql-request';
import { contentful } from './client';
import { GetResearchLandingPageResponse } from '@/types';

const GetResearchLandingPage = gql`
  query {
    researchLandingPageWebCollection(limit: 1) {
      items {
        title
        seo {
          title
          description
          image {
            url
            description
            title
          }
        }
        productsCollection {
          items {
            productSlug
            product {
              title
              caption
              features
              sampleReport {
                url
                title
              }
              image {
                url
                description
                title
              }
              logo {
                url
                title
                description
              }
              themeImage {
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

export const getResearchLandingPage = async () => {
  const { researchLandingPageWebCollection } =
    await contentful.request<GetResearchLandingPageResponse>(
      GetResearchLandingPage
    );

  return researchLandingPageWebCollection.items[0];
};
