import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIdToken } from 'core';
import { VaultAsset, VaultAssetAddress } from '@/types';

export const vaultApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${process.env.NEXT_PUBLIC_API_DOMAIN}/apps/vault/`,
    prepareHeaders: async (headers) => {
      const token = await getIdToken();
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['VaultAssets', 'VaultAssetsAddress'],
  endpoints: (builder) => ({
    getVaultAssets: builder.query<VaultAsset[], string>({
      query: (currency) => `assets?currency=${currency}`,
      providesTags: ['VaultAssets'],
    }),
    getVaultAssetAddresses: builder.query<VaultAssetAddress[], string>({
      query: (assetId) => `assets/${assetId}/addresses`,
      providesTags: ['VaultAssetsAddress'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetVaultAssetsQuery,
  useLazyGetVaultAssetsQuery,
  useGetVaultAssetAddressesQuery,
  useLazyGetVaultAssetAddressesQuery,
} = vaultApi;

// export endpoints for use in SSR
export const { getVaultAssets, getVaultAssetAddresses } = vaultApi.endpoints;
