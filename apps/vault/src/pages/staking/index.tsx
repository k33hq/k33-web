import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import React, { ReactElement, useEffect } from 'react';
import { PrivateMainLayout } from '@/layouts';
import { Breadcrumbs, StakingAssetsTable } from '@/components';
import { useRouter } from 'next/router';
import config from '@/firebase/config';
import { vaultApi } from '@/services';
import checkError from '@/utils/api';

const StakingAssetsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);
  const [query, queryResult] = vaultApi.useLazyGetVaultStakingAssetsQuery();
  useEffect(() => {
    const getVaultStakingAssets = async () => {
      try {
        query();
      } catch (error) {
        // window.location.assign(
        //   `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
        // );
      }
    };
    if (state === 'REGISTERED') {
      getVaultStakingAssets().then();
    }
  }, [state, query, router]);
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
    const vaultStakingAssets = queryResult.data;
    if (vaultStakingAssets.length === 0) {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          No stakable assets (ETH, SOL) found.
        </h1>
      );
    } else {
      content = <StakingAssetsTable vaultStakingAssets={vaultStakingAssets} />;
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
      <div className="my-3">{content}</div>
    </>
  );
};

StakingAssetsPage.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default StakingAssetsPage;
