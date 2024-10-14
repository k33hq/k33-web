import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import React, { ReactElement, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import {
  Breadcrumbs,
  CopyText,
  VaultStakingPositionStatusLabel,
} from '@/components';
import { useRouter } from 'next/router';
import config from '@/firebase/config';
import { vaultApi } from '@/services';
import { useParams } from 'next/navigation';
import { formatDateTime } from '@/utils/formatters';
import { BasicButton } from 'ui';
import checkError from '@/utils/api';

const StakingPositionPage: NextPageWithLayout = () => {
  const params = useParams<{ stakingPositionId: string }>();
  const router = useRouter();
  const state = useAppState(config);
  const [query, queryResult] = vaultApi.useLazyGetVaultStakingPositionQuery();
  const [update, updateResult] =
    vaultApi.useUpdateVaultStakingPositionMutation();
  useEffect(() => {
    const getVaultStakingPosition = async () => {
      try {
        query(params.stakingPositionId);
      } catch (error) {
        // window.location.assign(
        //   `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
        // );
      }
    };
    if (state === 'REGISTERED') {
      getVaultStakingPosition().then();
    }
  }, [state, params, query, router]);
  const vaultStakingPosition =
    (queryResult.isSuccess && queryResult.data) ??
    (updateResult.isSuccess && updateResult.data);
  const isLoading = queryResult.isLoading || updateResult.isLoading;
  const isError = queryResult.isError || updateResult.isError;
  const errorInfo = checkError(queryResult) ?? checkError(updateResult);

  let content: ReactElement = <></>;
  if (isLoading) {
    content = (
      <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
        Loading...
      </h1>
    );
  } else if (isError) {
    if (errorInfo) {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          {errorInfo.message}
        </h1>
      );
    } else {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          Error occurred in fetching information
        </h1>
      );
    }
  } else if (vaultStakingPosition) {
    content = (
      <div className="mt-8">
        <div className="mx-0 sm:mx-4 px-4 sm:px-0">
          <p className="my-1 max-w-2xl text-sm leading-6 text-label-light-secondary">
            Vault Staking Position
          </p>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            <CopyText
              text={vaultStakingPosition.id}
              alertMessage="Staking position id copied"
            />
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-bg-dark-elevated-tertiary">
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                Chain
              </dt>
              <dd className="mt-1 text-sm leading-6 text-label-light-primary sm:col-span-2 sm:mt-0">
                {vaultStakingPosition.chainDescriptor}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                Amount
              </dt>
              <dd className="mt-1 text-sm leading-6 text-label-light-primary sm:col-span-2 sm:mt-0">
                {vaultStakingPosition.amount}
              </dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                Rewards Amount
              </dt>
              <dd className="mt-1 text-sm leading-6 text-label-light-primary sm:col-span-2 sm:mt-0">
                {vaultStakingPosition.rewardsAmount}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                Created on
              </dt>
              <dd className="mt-1 text-sm leading-6 text-label-light-primary sm:col-span-2 sm:mt-0">
                {formatDateTime(new Date(vaultStakingPosition.dateCreated))}
              </dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                Status
              </dt>
              <dd className="mt-1 text-sm leading-6 text-label-dark-primary sm:col-span-2 sm:mt-0">
                <VaultStakingPositionStatusLabel
                  status={vaultStakingPosition.status}
                />
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                In Progress
              </dt>
              <dd className="mt-1 text-sm leading-6 text-label-light-primary sm:col-span-2 sm:mt-0">
                {vaultStakingPosition.inProgress ? 'Yes' : 'No'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                Provider
              </dt>
              <dd className="mt-1 text-sm leading-6 text-label-light-primary sm:col-span-2 sm:mt-0">
                {vaultStakingPosition.providerName}
              </dd>
            </div>
            {vaultStakingPosition.inProgressTxId ? (
              <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-label-light-secondary">
                  In progress transaction ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-label-light-primary sm:col-span-2 sm:mt-0">
                  {vaultStakingPosition.inProgressTxId}
                </dd>
              </div>
            ) : (
              <></>
            )}
            {vaultStakingPosition.availableActions.includes('unstake') ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                <dt></dt>
                <dl>
                  <BasicButton
                    size="medium"
                    onClick={() => {
                      update({
                        stakingPositionId: vaultStakingPosition.id,
                        action: 'unstake',
                      });
                    }}
                  >
                    Unstake
                  </BasicButton>
                </dl>
              </div>
            ) : (
              <></>
            )}
            {vaultStakingPosition.availableActions.includes('claimRewards') ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                <dt></dt>
                <dl>
                  <BasicButton
                    size="medium"
                    onClick={() => {
                      update({
                        stakingPositionId: vaultStakingPosition.id,
                        action: 'claimRewards',
                      });
                    }}
                  >
                    Claim rewards
                  </BasicButton>
                </dl>
              </div>
            ) : (
              <></>
            )}
          </dl>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Staking', 'Positions')}</title>
      </Head>

      <Breadcrumbs
        pages={[
          { name: 'STAKING', href: '/staking', current: false },
          {
            name: 'STAKING POSITIONS',
            href: '/staking/positions',
            current: false,
          },
          {
            name: params?.stakingPositionId ?? '',
            href: `/staking/positions/${params?.stakingPositionId ?? ''}`,
            current: true,
          },
        ]}
      />
      {content}
    </>
  );
};
StakingPositionPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default StakingPositionPage;
