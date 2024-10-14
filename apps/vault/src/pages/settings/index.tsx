import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import React, { ReactElement, useEffect } from 'react';
import { PrivateMainLayout } from '@/layouts';
import { Breadcrumbs, CurrencyDropdown, TransactionsTable } from '@/components';
import { useRouter } from 'next/router';
import config from '@/firebase/config';
import { vaultApi } from '@/services';
import checkError from '@/utils/api';

const SettingsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);
  const [query, queryResult] = vaultApi.useLazyGetSettingQuery();
  const [update, updateResult] = vaultApi.useUpdateSettingMutation();
  useEffect(() => {
    const getSettings = async () => {
      try {
        query();
      } catch (error) {
        // window.location.assign(
        //   `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
        // );
      }
    };
    if (state === 'REGISTERED') {
      getSettings().then();
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
    const settings = queryResult.data;
    content = (
      <>
        <CurrencyDropdown
          className="mx-4 text-label-light-primary font-semibold"
          currency={settings.currency}
          setCurrency={(currency) => update({ currency })}
        />
        <div className="mx-4 text-label-light-primary font-semibold">
          Timezone:{' '}
          <span className="font-mono">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Settings')}</title>
      </Head>
      <Breadcrumbs
        pages={[{ name: 'Settings', href: '/settings', current: true }]}
      />
      <div className="my-3">{content}</div>
    </>
  );
};

SettingsPage.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default SettingsPage;
