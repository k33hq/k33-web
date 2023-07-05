import { gql } from 'graphql-request';
import {
  AssetFragment,
  ArticleLinkedFragment,
  IndexTableArticleFragment,
  ArticleSummaryLinkedFragment,
} from './fragments';
import { contentful } from './client';
import { GetIndexeSummaryResponse, GetIndexesResponse } from '@/types';

const Indexes = gql`
  query {
    indexCollection(limit: 1) {
      items {
        name
        slug
        description
        chartBody

        selectedTokensCollection {
          items {
            commentary
            selected
            name
            token {
              id
              name
              icon {
                ...asset
              }
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

const IndexSummary = gql`
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
              icon {
                ...asset
              }
            }
          }
        }

        frameworkArticle {
          ...tableArticle
        }

        assessmentArticle {
          ...tableArticle
        }
      }
    }
  }
  ${AssetFragment}
  ${ArticleLinkedFragment}
  ${IndexTableArticleFragment}
`;

export const getIndexes = async () => {
  const { indexCollection } = await contentful.request<GetIndexesResponse>(
    Indexes
  );
  return indexCollection.items;
};

export const getIndexSummary = async () => {
  const { indexCollection } =
    await contentful.request<GetIndexeSummaryResponse>(IndexSummary);
  return indexCollection.items;
};
