import { gql } from 'graphql-request';
import { contentful } from './client';
import { NewsResponse } from '@/types';

const News = gql`
  query {
    news(id: "5HhXgNcBba30ipjyWVmSPn") {
      topNews {
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

      otherNews {
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
    }
  }
`;

export const getNews = async () => {
  const { news } = await contentful.request<NewsResponse>(News);
  return news;
};
