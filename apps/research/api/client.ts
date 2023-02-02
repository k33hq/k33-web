import { GraphQLClient } from 'graphql-request';

export const contentful = new GraphQLClient(
  `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/content/v1/spaces/${[
    process.env.CONTENTFUL_SPACE_ID,
  ]}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);

export const getContentful = async () => contentful;
