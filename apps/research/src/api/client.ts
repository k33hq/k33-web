import { GraphQLClient } from 'graphql-request';

export const contentful = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_RESEARCH_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_RESEARCH_ENVIRONMENT}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_RESEARCH_ACCESS_TOKEN}`,
    },
  }
);
