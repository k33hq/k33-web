import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { getIdToken } from 'core';
import { Fund, InvestorInfo } from '@/types';

export const investApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${process.env.NEXT_PUBLIC_API_DOMAIN}/apps/invest/`,
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

  tagTypes: ['Register'],
  endpoints: (builder) => ({
    getFundRegistration: builder.query<any, string>({
      query: (fund) => `funds/${fund}`,
      providesTags: ['Register'],
    }),

    fundRegistration: builder.mutation<any, InvestorInfo & Fund>({
      query: ({ id, ...body }) => ({
        url: `funds/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Register'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetFundRegistrationQuery,
  useLazyGetFundRegistrationQuery,
  useFundRegistrationMutation,
  util: { getRunningQueriesThunk },
} = investApi;

// export endpoints for use in SSR
export const { getFundRegistration, fundRegistration } = investApi.endpoints;
