import { gql } from 'graphql-request';
import { contentful } from './client';
import { GetSubscriptionProductResponse } from '@/types';

const GetProducts = gql`
  query {
    subscriptionProductCollection(limit: 1) {
      items {
        productId
        pricesCollection(limit: 1) {
          items {
            stripeProductId
          }
        }
      }
    }
  }
`;

export const getProducts = async () => {
  const { subscriptionProductCollection } =
    await contentful.request<GetSubscriptionProductResponse>(GetProducts);
  return subscriptionProductCollection.items[0];
};
