import { GraphQLClient } from 'graphql-request';
import Stripe from 'stripe';

export const contentful = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}/content/v1/spaces/${[
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  ]}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);

export const getContentful = async () => contentful;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});
