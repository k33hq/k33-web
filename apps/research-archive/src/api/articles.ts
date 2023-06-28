import { gql } from 'graphql-request';
import { contentful } from './client';
import { GetArchivedPageResponse, GetArchivedPageSlugsResponse } from '@/types';

const GetArchivedPageSlugs = gql`
  query {
    pageCollection(limit: 1000) {
      items {
        slug
      }
    }
  }
`;
const GetArchivedPage = gql`
  query GetArchivedPage($slug: String!) {
    pageCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        seo {
          name
          title
          description
          keywords
        }
        content {
          ... on PageWeeklyUpdate {
            subtitle
            image {
              url
              title
              description
            }
            publishDate
            tagsCollection(limit: 10) {
              items {
                name
              }
            }
            authorsCollection(limit: 4) {
              items {
                name
                slug
                title
                image {
                  fileName
                  title
                  description
                  url
                }
              }
            }
            publicSnippet {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    title
                    width
                    height
                    description
                    contentType
                  }
                }
              }
            }
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    title
                    width
                    height
                    description
                    contentType
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getArchivedPageSlugs = async () => {
  const { pageCollection } =
    await contentful.request<GetArchivedPageSlugsResponse>(
      GetArchivedPageSlugs
    );

  return pageCollection.items;
};

export const getArchivedArticle = async (slug: string) => {
  const { pageCollection } = await contentful.request<GetArchivedPageResponse>(
    GetArchivedPage,
    {
      slug,
    }
  );

  return pageCollection.items[0];
};
