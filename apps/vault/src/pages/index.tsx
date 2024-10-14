import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import { vaultApi } from '@/services';
import { useRouter } from 'next/router';
import { PrivateMainLayout } from '@/layouts';
import config from '@/firebase/config';
import { Amount, VaultAssetAddress } from '@/types';
import {
  AddressModal,
  BalanceCard,
  CurrencyDropdown,
  DonutChart,
  VaultAssetsTable,
} from '@/components';
import checkError from '@/utils/api';

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);
  const [getVaultAssetsQuery, vaultAssetsResult] =
    vaultApi.useLazyGetVaultAssetsQuery();
  const [getVaultAssetAddressesQuery] =
    vaultApi.useLazyGetVaultAssetAddressesQuery();
  const [currency, setCurrency] = useState('USD');
  const [vaultAssetAddresses, setVaultAssetAddresses] = useState<
    VaultAssetAddress[] | null
  >(null);
  useEffect(() => {
    const getVaultAssets = async () => {
      try {
        getVaultAssetsQuery(currency);
      } catch (error) {
        // window.location.assign(
        //   `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
        // );
      }
    };
    if (state === 'REGISTERED') {
      getVaultAssets().then();
    }
  }, [state, getVaultAssetsQuery, router, currency]);

  let content: ReactElement = <></>;
  if (vaultAssetsResult.isLoading) {
    content = (
      <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
        Loading...
      </h1>
    );
  } else if (vaultAssetsResult.isError) {
    const errorInfo = checkError(vaultAssetsResult);
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
  } else if (vaultAssetsResult.isSuccess) {
    const vaultAssets = vaultAssetsResult.data;
    if (vaultAssets.length === 0) {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          No assets found
        </h1>
      );
    } else {
      // amounts: Amount[] = [{currency: cryptocurrency, value: fiatValue}]
      const amounts = vaultAssets
        .flatMap((vaultAsset) =>
          vaultAsset.fiatValue?.value && vaultAsset.id
            ? [
                {
                  value: vaultAsset.fiatValue.value,
                  currency: vaultAsset.id,
                },
              ]
            : []
        )
        // sort descending
        .sort((a, b) => b.value - a.value);
      const total = vaultAssets
        .flatMap((vaultAsset) =>
          vaultAsset.fiatValue ? [vaultAsset.fiatValue] : []
        )
        .reduce(
          (previousValue, currentValue): Amount => ({
            value: previousValue.value + currentValue.value,
            currency: previousValue.currency,
          }),
          { value: 0, currency }
        );
      content = (
        <>
          {total.value > 0 && (
            <DonutChart
              amounts={amounts}
              currency={currency}
              className="max-w-96 max-h-96 my-8 self-center"
            />
          )}
          <BalanceCard
            amount={total}
            className="block p-6 border rounded-lg self-start bg-bg-dark-elevated-tertiary"
          />
          <CurrencyDropdown
            currency={currency}
            setCurrency={setCurrency}
            className="mx-4 text-label-light-primary font-semibold"
          />
          <VaultAssetsTable
            vaultAssets={vaultAssets}
            total={total}
            showAssetAddress={(vaultAssetId) =>
              getVaultAssetAddressesQuery(vaultAssetId)
                .unwrap()
                .then((addresses) => setVaultAssetAddresses(addresses))
            }
          />
          <AddressModal
            vaultAssetAddresses={vaultAssetAddresses || []}
            visible={vaultAssetAddresses !== null}
            hide={() => setVaultAssetAddresses(null)}
          />
        </>
      );
    }
  }

  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Home')}</title>
      </Head>
      {content}
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default HomePage;
