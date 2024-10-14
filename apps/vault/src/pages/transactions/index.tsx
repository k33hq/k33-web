import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import React, { ReactElement, useState } from 'react';
import { PrivateMainLayout } from '@/layouts';
import { Breadcrumbs, TransactionsTable } from '@/components';
import { useRouter } from 'next/router';
import config from '@/firebase/config';
import { vaultApi } from '@/services';
import checkError from '@/utils/api';
import { BasicButton } from 'ui';

const TransactionsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);
  const [query, queryResult] = vaultApi.useLazyGetTransactionsQuery();
  const [afterDate, setAfterDate] = useState<Date>(new Date());
  const [beforeDate, setBeforeDate] = useState<Date>(new Date());
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
    const transactions = queryResult.data;
    if (transactions.length === 0) {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          No transactions found.
        </h1>
      );
    } else {
      content = <TransactionsTable transactions={transactions} />;
    }
  }
  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Transactions')}</title>
      </Head>
      <Breadcrumbs
        pages={[{ name: 'Transactions', href: '/transactions', current: true }]}
      />
      <div className="my-3">
        <div className="p-3 flex">
          <div className="rounded border p-1 mx-1 border-brand-light-tertiary">
            <label
              htmlFor="afterDate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Start date
            </label>
            <input
              id="afterDate"
              type="date"
              value={afterDate.toISOString().split('T')[0]}
              onChange={(e) => {
                setAfterDate(new Date(e.target.value));
              }}
            />
          </div>
          <div className="rounded border p-1 mx-1 border-brand-light-tertiary">
            <label
              htmlFor="beforeDate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              End date
            </label>
            <input
              id="beforeDate"
              type="date"
              value={beforeDate.toISOString().split('T')[0]}
              onChange={(e) => {
                setBeforeDate(new Date(e.target.value));
              }}
            />
          </div>
          <div className="p-1 mx-1 mt-2">
            <BasicButton
              variant="secondary"
              size="medium"
              type="submit"
              onClick={() =>
                query({
                  afterDate: afterDate.toISOString().split('T')[0],
                  beforeDate: beforeDate.toISOString().split('T')[0],
                })
              }
            >
              Search
            </BasicButton>
          </div>
        </div>
        {content}
      </div>
    </>
  );
};

TransactionsPage.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default TransactionsPage;
