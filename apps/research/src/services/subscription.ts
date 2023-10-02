import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { getIdToken } from 'core';
import {
  CheckOutSessionRequest,
  CheckoutSessionResponse,
  CustomerPortalSessionRequest,
  CustomerPortalSessionResponse,
  GetProductInfoResponse,
  PutSupressionGroupRequest,
  SupressionGroupResponse,
} from '@/types';
import { appStructure } from '@/config';

export const researchApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${process.env.NEXT_PUBLIC_API_DOMAIN}`,
    prepareHeaders: async (headers) => {
      //@ts-ignore
      window.gtag(
        'get',
        process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
        'client_id',
        (clientId: string) => {
          // TODO: check if localstorage says cookie-product yes
          const check = localStorage.getItem('cookies-product');
          if (check === 'YES') {
            headers.set('x-client-id', `${clientId}`);
          }
        }
      );
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

  tagTypes: ['Products', 'Group'],
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
    getSupressionGroups: builder.query<SupressionGroupResponse, void>({
      query: () => `suppression-groups`,
      transformResponse: (response: SupressionGroupResponse) => {
        const groupsFilter = Object.keys(appStructure.notifications);
        return response.filter(({ id }) => groupsFilter.includes(String(id)));
      },
      providesTags: ['Group'],
    }),
    putSupressionGroup: builder.mutation<any, PutSupressionGroupRequest>({
      query: ({ groupId }) => ({
        url: `suppression-groups/${groupId}`,
        method: 'PUT',
        body: {},
      }),
      invalidatesTags: ['Group'],
    }),

    deleteSupressionGroup: builder.mutation<any, PutSupressionGroupRequest>({
      query: ({ groupId }) => ({
        url: `suppression-groups/${groupId}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Group'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
  useGetSupressionGroupsQuery,
  usePutSupressionGroupMutation,
  useDeleteSupressionGroupMutation,
  util: { getRunningQueriesThunk },
} = researchApi;

// export endpoints for use in SSR
export const { checkout, customer } = researchApi.endpoints;
