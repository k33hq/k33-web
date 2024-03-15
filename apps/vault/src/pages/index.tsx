import { createContext, ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import {
  useLazyGetVaultAssetAddressesQuery,
  useLazyGetVaultAssetsQuery,
} from '@/services';
import { useRouter } from 'next/router';
import { PrivateMainLayout } from '@/layouts';
import config from '@/firebase/config';
import { Amount, VaultAsset, VaultAssetAddress } from '@/types';
import {
  AddressModal,
  BalanceCard,
  CurrencyDropdown,
  DonutChart,
  VaultAssetsTable,
  InfoAlert,
} from '@/components';

/**
 *  user-state: [vaultAccounts]
 * @returns
 */

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);
  const [isLoading, setIsLoading] = useState(true);
  const [vaultAssets, setVaultAssets] = useState<VaultAsset[]>([]);
  const [getVaultAssetsQuery] = useLazyGetVaultAssetsQuery();
  const [getVaultAssetAddressesQuery] = useLazyGetVaultAssetAddressesQuery();
  const [currency, setCurrency] = useState('USD');
  const [vaultAssetAddresses, setVaultAssetAddresses] = useState<
    VaultAssetAddress[] | null
  >(null);
  useEffect(() => {
    const getVaultAssets = async () => {
      try {
        setVaultAssets(await getVaultAssetsQuery(currency).unwrap());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        window.location.assign(
          `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody`
        );
      }
    };
    getVaultAssets();
  }, [state, getVaultAssetsQuery, router, currency]);

  let content: ReactElement;
  if (isLoading) {
    content = (
      <h1
        className={
          'block text-label-light-secondary text-[48px] text-center p-32'
        }
      >
        Loading...
      </h1>
    );
  } else if (vaultAssets.length == 0) {
    content = (
      <h1
        className={
          'block text-label-light-secondary text-[48px] text-center p-32'
        }
      >
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
        })
      );
    content = (
      <>
        <DonutChart
          amounts={amounts}
          currency={currency}
          className={'max-w-96 max-h-96 my-8 self-center'}
        />
        <BalanceCard
          amount={total}
          className={
            'block p-6 border rounded-lg self-start bg-bg-dark-elevated-tertiary'
          }
        />
        <CurrencyDropdown
          currency={currency}
          setCurrency={setCurrency}
          className={'mx-4 text-label-light-primary font-semibold'}
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

  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Home')}</title>
      </Head>
      {content}
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default Home;
