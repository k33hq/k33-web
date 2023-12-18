import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface AnalyticsEvent {
  name: string;
  params: {
    report_name: string;
    section: string;
  };
}

interface AnalyticsRequest {
  client_id: string;
  events: Array<AnalyticsEvent>;
}

export const analyticsAPI = createApi({
  reducerPath: 'analytics',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.google-analytics.com`,
    mode: 'no-cors',
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  tagTypes: ['Products', 'Group'],
  endpoints: (builder) => ({
    analytics: builder.mutation<any, AnalyticsRequest>({
      query: (body) => ({
        url: `/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}&api_secret=${process.env.NEXT_PUBLIC_ANALYTICS_API_KEY}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useAnalyticsMutation,
  util: { getRunningQueriesThunk },
} = analyticsAPI;
