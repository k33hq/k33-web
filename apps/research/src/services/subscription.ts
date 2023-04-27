import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { getIdToken } from 'core';
import {
  CheckOutSessionRequest,
  CheckoutSessionResponse,
  CustomerPortalSessionRequest,
  CustomerPortalSessionResponse,
  GetProductInfoResponse,
  GetProductsResponse,
} from '@/types';

export const researchApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_K33_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = await getIdToken();
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  tagTypes: ['Products'],
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutSessionResponse, CheckOutSessionRequest>(
      {
        query: (body) => ({
          url: `payment/checkout-sessions`,
          method: 'POST',
          body,
        }),
      }
    ),
    customer: builder.mutation<
      CustomerPortalSessionResponse,
      CustomerPortalSessionRequest
    >({
      query: (body) => ({
        url: `payment/customer-portal-sessions`,
        method: 'POST',
        body,
      }),
    }),
    getProductInfo: builder.query<GetProductInfoResponse, string>({
      query: (productId) => `payment/subscribed-products/${productId}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
  util: { getRunningQueriesThunk },
} = researchApi;

// export endpoints for use in SSR
export const { checkout, customer } = researchApi.endpoints;
