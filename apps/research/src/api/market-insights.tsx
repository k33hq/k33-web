import { gql } from 'graphql-request';
import { contentful } from './client';
import { AssetFragment } from './fragments';
import { GetArticleWebWidgetsResponse } from '@/types';

const GetArticleWebWidgets = gql`
  query GetQuickTakes($section: String!) {
    articleWebCollection(
      where: { section: { name: $section } }
      order: [publishedDate_DESC]
      limit: 100
    ) {
      items {
        article {
          thumbnail {
            ...asset
          }
          title
        }
        articleSlug
        publishedDate
      }
    }
  }
  ${AssetFragment}
`;

export const getArticleWebWidgets = async (section: string) => {
  const { articleWebCollection } =
    await contentful.request<GetArticleWebWidgetsResponse>(
      GetArticleWebWidgets,
      {
        section,
      }
    );
  return articleWebCollection.items;
};
