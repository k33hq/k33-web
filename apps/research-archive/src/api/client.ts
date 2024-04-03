import { GraphQLClient } from 'graphql-request';

export const contentful = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_ARCHIVE_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ARCHIVE_ENVIRONMENT}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ARCHIVE_ACCESS_TOKEN}`,
    },
  }
);
