import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import React, { ReactElement, useEffect } from 'react';
import { PrivateMainLayout } from '@/layouts';
import { StakingProviderInfo, Breadcrumbs } from '@/components';
import { useRouter } from 'next/router';
import config from '@/firebase/config';
import { vaultApi } from '@/services';
import checkError from '@/utils/api';
import { useSearchParams } from 'next/navigation';

const StakingProvidersPage: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);
  const searchParams = useSearchParams();
  const stakingProviderId = searchParams.get('stakingProviderId');
  const [query, queryResult] = vaultApi.useLazyGetStakingProvidersQuery();
  const stakingProvider =
    stakingProviderId !== null &&
    queryResult.isSuccess &&
    queryResult.data &&
    (queryResult.data.find((provider) => provider.id === stakingProviderId) ??
      false);
  useEffect(() => {
    const getStakingProviders = async () => {
      try {
        query();
      } catch (error) {
        // window.location.assign(
        //   `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
        // );
      }
    };
    if (state === 'REGISTERED') {
      getStakingProviders().then();
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
  } else if (stakingProvider) {
    content = <StakingProviderInfo stakingProvider={stakingProvider} />;
  } else if (queryResult.isSuccess) {
    const stakingProviders = queryResult.data;
    if (!stakingProviders || stakingProviders.length == 0) {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          No staking provider(s) found.
        </h1>
      );
    } else {
      content = (
        <div className="grid grid-cols-1 bg-bg-light-secondary p-2">
          {stakingProviders &&
            stakingProviders.map((stakingProvider) => (
              <div
                key={stakingProvider.id}
                className="m-3 rounded-lg bg-bg-light-primary shadow"
              >
                <div className="px-4 py-5">
                  <StakingProviderInfo stakingProvider={stakingProvider} />
                </div>
              </div>
            ))}
        </div>
      );
    }
  }
  const pages = [{ name: 'Staking', href: '/staking', current: false }];
  if (stakingProviderId && stakingProvider) {
    pages.push(
      {
        name: 'Staking Providers',
        href: '/staking/providers',
        current: false,
      },
      {
        name: stakingProvider.providerName ?? stakingProviderId,
        href: `/staking/providers?stakingProviderId=${stakingProviderId}`,
        current: true,
      }
    );
  } else {
    pages.push({
      name: 'Staking Providers',
      href: '/staking/providers',
      current: true,
    });
  }
  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Staking', 'Providers')}</title>
      </Head>
      <Breadcrumbs pages={pages} />
      <div className="my-3">{content}</div>
    </>
  );
};

StakingProvidersPage.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default StakingProvidersPage;
