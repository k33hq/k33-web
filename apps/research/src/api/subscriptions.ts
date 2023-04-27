import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  GetAllSubscriptionProductsResponse,
  GetAllSubscriptionSlugsResponse,
  GetAllSubscriptionsResponse,
  GetSubscriptionFromSlugResponse,
} from '@/types';

// TODO: structure the products to mimic stripe product => price list relationship
// TODO: domains => Subscription => SubscriptionPrice
const GetAllSubscriptions = gql`
  query {
    subscriptionCollection(order: importance_ASC) {
      items {
        name
        description
        features
        image {
          url
          title
          description
        }
        stripeProductId
        linkedFrom {
          subscriptionWebCollection {
            items {
              subscriptionSlug
              title
              label
            }
          }
        }
      }
    }
  }
`;

const GetAllSubscriptionSlugs = gql`
  query {
    subscriptionWebCollection {
      items {
        subscriptionSlug
      }
    }
  }
`;

const GetSubscriptionBySlug = gql`
  query GetSubscriptionBySlug($subscriptionSlug: String!) {
    subscriptionWebCollection(
      where: { subscriptionSlug: $subscriptionSlug }
      limit: 1
    ) {
      items {
        title
        subscription {
          name
          stripeProductId
          description
          features
          image {
            url
            title
            description
          }
        }
      }
    }
  }
`;

const GetK33Products = gql`
  query {
    subscriptionProductCollection {
      items {
        productId
      }
    }
  }
`;

export const getAllSubscriptions = async () => {
  const { subscriptionCollection } =
    await contentful.request<GetAllSubscriptionsResponse>(GetAllSubscriptions);

  return subscriptionCollection.items;
};

export const getAllSubscriptionSlugs = async () => {
  const { subscriptionWebCollection } =
    await contentful.request<GetAllSubscriptionSlugsResponse>(
      GetAllSubscriptionSlugs
    );

  return subscriptionWebCollection.items;
};

export const getSubscriptionBySlug = async (subscriptionSlug: string) => {
  const { subscriptionWebCollection } =
    await contentful.request<GetSubscriptionFromSlugResponse>(
      GetSubscriptionBySlug,
      {
        subscriptionSlug,
      }
    );

  return subscriptionWebCollection.items[0];
};

export const getK33Products = async () => {
  const { subscriptionProductCollection } =
    await contentful.request<GetAllSubscriptionProductsResponse>(
      GetK33Products
    );

  return subscriptionProductCollection.items;
};
