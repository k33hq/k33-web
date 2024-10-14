import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import React, { ReactElement, useEffect, useState } from 'react';
import { PrivateMainLayout } from '@/layouts';
import {
  Breadcrumbs,
  StakingAssetsTable,
  StakeActionModal,
} from '@/components';
import { useRouter } from 'next/router';
import config from '@/firebase/config';
import { vaultApi } from '@/services';
import checkError from '@/utils/api';
import Big from 'big.js';

const StakingAssetsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);
  const [stakeAssetId, setStakeAssetId] = useState<string | null>(null);
  const [query, queryResult] = vaultApi.useLazyGetStakingAssetsQuery();
  const [queryProviders, queryProvidersResult] =
    vaultApi.useLazyGetStakingProvidersQuery();
  useEffect(() => {
    const getStakingAssets = async () => {
      try {
        query();
        queryProviders();
      } catch (error) {
        // window.location.assign(
        //   `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
        // );
      }
    };
    if (state === 'REGISTERED') {
      getStakingAssets().then();
    }
  }, [state, query, queryProviders, router]);
  let content: ReactElement = <></>;
  if (queryResult.isLoading) {
    content = (
      <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
        Loading...
      </h1>
    );
  } else if (queryResult.isError) {
    const errorInfo = checkError(queryResult);
    if (errorInfo) {
      // if (errorInfo.errorCode === 'NOT_REGISTERED') {
      //   window.location.assign(
      //     `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
      //   );
      // }
      content = (
        <>
          <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
            {errorInfo.message}
          </h1>
        </>
      );
    } else {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          Error occurred in fetching information
        </h1>
      );
    }
  } else if (queryResult.isSuccess) {
    const stakingAssets = queryResult.data;
    if (stakingAssets.length === 0) {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          No stakable assets (ETH, SOL) found.
        </h1>
      );
    } else {
      content = (
        <StakingAssetsTable
          stakingAssets={stakingAssets}
          onStake={(stakeAssetId) => {
            setStakeAssetId(stakeAssetId);
          }}
        />
      );
    }
  }
  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Staking')}</title>
      </Head>
      <Breadcrumbs
        pages={[{ name: 'Staking', href: '/staking', current: true }]}
      />
      {stakeAssetId && queryResult.data && queryProvidersResult.data && (
        <StakeActionModal
          stakeAssetId={stakeAssetId}
          providers={queryProvidersResult.data}
          available={Big(
            queryResult.data.find(
              (stakingAsset) => stakingAsset.id === stakeAssetId
            )?.available ?? '0'
          )}
          hide={() => setStakeAssetId(null)}
        />
      )}
      <div className="my-3">{content}</div>
    </>
  );
};

StakingAssetsPage.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default StakingAssetsPage;
