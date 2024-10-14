import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIdToken } from 'core';
import {
  UpdateVaultStakingPositionAction,
  VaultAsset,
  VaultAssetAddress,
  VaultStakingAsset,
  VaultStakingPosition,
} from '@/types';
import * as url from 'node:url';

interface StakeRequest {
  vaultAssetId: string;
  amount: string;
}

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

  tagTypes: [
    'VaultAssets',
    'VaultAssetsAddress',
    'VaultStakingAssets',
    'VaultStakingPositions',
  ],

  endpoints: (builder) => ({
    getVaultAssets: builder.query<VaultAsset[], string>({
      query: (currency) => `assets?currency=${currency}`,
      providesTags: (vaultAssets) =>
        vaultAssets
          ? [
              ...vaultAssets.map(({ id }) => ({
                type: 'VaultAssets' as const,
                id,
              })),
              { type: 'VaultAssets', id: 'LIST' },
            ]
          : [{ type: 'VaultAssets', id: 'LIST' }],
    }),

    getVaultAssetAddresses: builder.query<VaultAssetAddress[], string>({
      query: (assetId) => `assets/${assetId}/addresses`,
      providesTags: (vaultAssetsAddresses) =>
        vaultAssetsAddresses
          ? [
              ...vaultAssetsAddresses.map(({ assetId }) => ({
                type: 'VaultAssetsAddress' as const,
                id: assetId,
              })),
              { type: 'VaultAssetsAddress', id: 'LIST' },
            ]
          : [{ type: 'VaultAssetsAddress', id: 'LIST' }],
    }),

    getVaultStakingAssets: builder.query<VaultStakingAsset[], void>({
      query: () => 'staking/assets',
      providesTags: (vaultStakingAssets) =>
        vaultStakingAssets
          ? [
              ...vaultStakingAssets.map(({ id }) => ({
                type: 'VaultStakingAssets' as const,
                id,
              })),
              { type: 'VaultStakingAssets', id: 'LIST' },
            ]
          : [{ type: 'VaultStakingAssets', id: 'LIST' }],
    }),

    getVaultStakingPositions: builder.query<VaultStakingPosition[], void>({
      query: () => 'staking/positions',
      providesTags: (vaultStakingPositions) =>
        vaultStakingPositions
          ? [
              ...vaultStakingPositions.map(({ id }) => ({
                type: 'VaultStakingPositions' as const,
                id,
              })),
              { type: 'VaultStakingPositions', id: 'LIST' },
            ]
          : [{ type: 'VaultStakingPositions', id: 'LIST' }],
    }),

    getVaultStakingPosition: builder.query<VaultStakingPosition, string>({
      query: (stakingPositionId) => `staking/positions/${stakingPositionId}`,
      providesTags: (vaultStakingPosition) =>
        vaultStakingPosition
          ? [
              {
                type: 'VaultStakingPositions' as const,
                id: vaultStakingPosition.id,
              },
            ]
          : [],
    }),

    createVaultStakingPosition: builder.mutation<
      VaultStakingPosition,
      StakeRequest
    >({
      query: (body) => {
        return {
          url: `staking/positions`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (vaultStakingPosition) =>
        vaultStakingPosition
          ? [
              { type: 'VaultStakingPositions', id: 'LIST' },
              {
                type: 'VaultStakingPositions',
                id: vaultStakingPosition.id,
              },
              { type: 'VaultStakingAssets', id: 'LIST' },
              {
                type: 'VaultStakingAssets',
                id: vaultStakingPosition.chainDescriptor,
              },
            ]
          : [
              { type: 'VaultStakingPositions', id: 'LIST' },
              { type: 'VaultStakingAssets', id: 'LIST' },
            ],
    }),

    updateVaultStakingPosition: builder.mutation<
      VaultStakingPosition,
      { stakingPositionId: string; action: UpdateVaultStakingPositionAction }
    >({
      query: ({ stakingPositionId, action }) => {
        return {
          url: `staking/positions/${stakingPositionId}?action=${action}`,
          method: 'PUT',
        };
      },
      invalidatesTags: (vaultStakingPosition) =>
        vaultStakingPosition
          ? [
              { type: 'VaultStakingPositions', id: 'LIST' },
              {
                type: 'VaultStakingPositions',
                id: vaultStakingPosition.id,
              },
              { type: 'VaultStakingAssets', id: 'LIST' },
              {
                type: 'VaultStakingAssets',
                id: vaultStakingPosition.chainDescriptor,
              },
            ]
          : [
              { type: 'VaultStakingPositions', id: 'LIST' },
              { type: 'VaultStakingAssets', id: 'LIST' },
            ],
    }),
  }),
});
