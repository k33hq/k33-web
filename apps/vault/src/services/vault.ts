import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIdToken } from 'core';
import {
  Asset,
  AssetAddress,
  Settings,
  StakingAsset,
  StakingPosition,
  StakingProvider,
  Transaction,
  TransactionSearchParams,
  UpdateStakingPositionAction,
} from '@/types';

interface StakeRequest {
  vaultAssetId: string;
  amount: string;
  providerId: string;
}

export const vaultApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${process.env.NEXT_PUBLIC_API_DOMAIN}/apps/vault/`,
    prepareHeaders: async (headers) => {
      const token = await getIdToken();
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    'VaultAssets',
    'VaultAssetsAddress',
    'StakingAssets',
    'StakingPositions',
    'StakingProviders',
    'Transactions',
    'Settings',
  ],

  endpoints: (builder) => ({
    getVaultAssets: builder.query<Asset[], string>({
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

    getVaultAssetAddresses: builder.query<AssetAddress[], string>({
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

    getStakingAssets: builder.query<StakingAsset[], void>({
      query: () => 'staking/assets',
      providesTags: (stakingAssets) =>
        stakingAssets
          ? [
              ...stakingAssets.map(({ id }) => ({
                type: 'StakingAssets' as const,
                id,
              })),
              { type: 'StakingAssets', id: 'LIST' },
            ]
          : [{ type: 'StakingAssets', id: 'LIST' }],
    }),

    getStakingPositions: builder.query<StakingPosition[], void>({
      query: () => 'staking/positions',
      providesTags: (stakingPositions) =>
        stakingPositions
          ? [
              ...stakingPositions.map(({ id }) => ({
                type: 'StakingPositions' as const,
                id,
              })),
              { type: 'StakingPositions', id: 'LIST' },
            ]
          : [{ type: 'StakingPositions', id: 'LIST' }],
    }),

    getStakingPosition: builder.query<StakingPosition, string>({
      query: (stakingPositionId) => `staking/positions/${stakingPositionId}`,
      providesTags: (stakingPosition) =>
        stakingPosition
          ? [
              {
                type: 'StakingPositions' as const,
                id: stakingPosition.id,
              },
            ]
          : [],
    }),

    getStakingProviders: builder.query<StakingProvider[], void>({
      query: () => `staking/providers`,
      providesTags: (stakingProviders) =>
        stakingProviders
          ? [
              ...stakingProviders.map(({ id }) => ({
                type: 'StakingProviders' as const,
                id,
              })),
              { type: 'StakingProviders', id: 'LIST' },
            ]
          : [{ type: 'StakingProviders', id: 'LIST' }],
    }),

    createStakingPosition: builder.mutation<StakingPosition, StakeRequest>({
      query: (body) => {
        return {
          url: `staking/positions`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (stakingPosition) =>
        stakingPosition
          ? [
              { type: 'StakingPositions', id: 'LIST' },
              {
                type: 'StakingPositions',
                id: stakingPosition.id,
              },
              { type: 'StakingAssets', id: 'LIST' },
              {
                type: 'StakingAssets',
                id: stakingPosition.chainDescriptor,
              },
            ]
          : [
              { type: 'StakingPositions', id: 'LIST' },
              { type: 'StakingAssets', id: 'LIST' },
            ],
    }),

    updateStakingPosition: builder.mutation<
      StakingPosition,
      { stakingPositionId: string; action: UpdateStakingPositionAction }
    >({
      query: ({ stakingPositionId, action }) => {
        return {
          url: `staking/positions/${stakingPositionId}?action=${action}`,
          method: 'PUT',
        };
      },
      invalidatesTags: (stakingPosition) =>
        stakingPosition
          ? [
              { type: 'StakingPositions', id: 'LIST' },
              {
                type: 'StakingPositions',
                id: stakingPosition.id,
              },
              { type: 'StakingAssets', id: 'LIST' },
              {
                type: 'StakingAssets',
                id: stakingPosition.chainDescriptor,
              },
            ]
          : [
              { type: 'StakingPositions', id: 'LIST' },
              { type: 'StakingAssets', id: 'LIST' },
            ],
    }),

    getTransactions: builder.query<Transaction[], TransactionSearchParams>({
      query: ({ beforeDate, afterDate }) =>
        `/transactions?afterDate=${afterDate}&beforeDate=${beforeDate}&zoneId=${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      providesTags: (transactions) =>
        transactions
          ? [
              ...transactions.map(({ id }) => ({
                type: 'Transactions' as const,
                id,
              })),
            ]
          : [],
    }),

    getSetting: builder.query<Settings, void>({
      query: () => 'settings',
      providesTags: (settings) =>
        settings
          ? [
              {
                type: 'Settings' as const,
                id: 'ID',
              },
            ]
          : [],
    }),

    updateSetting: builder.mutation<Settings, Settings>({
      query: (body) => {
        return {
          url: 'settings',
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: (settings) =>
        settings ? [{ type: 'Settings', id: 'ID' }] : [],
    }),
  }),
});
