import { GraphQLClient } from 'graphql-request';

export const contentful = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);

export const getContentful = async () => contentful;

export const archiveContentful = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ARCHIVE_SPACE_ID}/environments/master`,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ARCHIVE_ACCESS_TOKEN}`,
    },
  }
);
