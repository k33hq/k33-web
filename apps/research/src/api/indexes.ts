import { gql } from 'graphql-request';
import {
  AssetFragment,
  ArticleLinkedFragment,
  IndexTableArticleFragment,
  ArticleSummaryLinkedFragment,
} from './fragments';
import { contentful } from './client';
import { GetIndexesResponse } from '@/types';

const Indexes = gql`
  query {
    indexCollection(limit: 1) {
      items {
        name
        slug
        description

        selectedTokensCollection {
          items {
            commentary
            selected
            name
            token {
              id
              name
            }
          }
        }

        chart {
          ...asset
        }

        frameworkArticle {
          ...tableArticle
        }

        assessmentArticle {
          ...tableArticle
        }

        highlightArticle {
          ...articleSummaryLinked
        }
      }
    }
  }
  ${AssetFragment}
  ${ArticleLinkedFragment}
  ${IndexTableArticleFragment}
  ${ArticleSummaryLinkedFragment}
`;

export const getIndexes = async () => {
  const { indexCollection } = await contentful.request<GetIndexesResponse>(
    Indexes
  );
  return indexCollection.items;
};
