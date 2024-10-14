'use client';

import * as React from 'react';
import { StakingPosition } from '@/types';
import Link from 'next/link';
import { StakingPositionStatusLabel } from '@/components';
import { formatDateTime } from '@/utils/formatters';
import Image from 'next/image';
import LinkIcon from '../../../assets/link-icon.svg';
import CryptoId from '../../CryptoId';
import { vaultApi } from '@/services';
import { ReactElement, useEffect } from 'react';
import checkError from '@/utils/api';
import { useRouter } from 'next/router';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';

const StakingPositionsTable: React.FC = () => {
  const router = useRouter();
  const state = useAppState(config);
  const [query, queryResult] = vaultApi.useLazyGetStakingPositionsQuery();
  useEffect(() => {
    const getStakingPositions = async () => {
      try {
        query();
      } catch (error) {
        // window.location.assign(
        //   `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody/not-registered`
        // );
      }
    };
    if (state === 'REGISTERED') {
      getStakingPositions().then();
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
    const stakingPositions = queryResult.data;
    if (!stakingPositions || stakingPositions.length == 0) {
      content = (
        <h1 className="block text-label-light-secondary text-[48px] text-center p-32">
          No staking positions found.
        </h1>
      );
    } else {
      content = (
        <div
          className={
            'border-collapse grid grid-cols-auto sm:grid-cols-[auto_auto] md:grid-cols-[repeat(7,auto)]'
          }
        >
          <div
            className={
              'bg-bg-dark-tertiary text-label-dark-secondary hidden md:grid grid-cols-subgrid col-span-7 p-3'
            }
          >
            <div className="text-center text-nowrap">ID</div>
            <div className="text-center text-nowrap">Cryptocurrency</div>
            <div className="text-center text-nowrap">Amount</div>
            <div className="text-center text-nowrap">Rewards Amount</div>
            <div className="text-center text-nowrap">Date Created</div>
            <div className="text-center text-nowrap">Status</div>
            <div className="text-center text-nowrap">In Progress</div>
          </div>
          {stakingPositions.map(
            (
              {
                id,
                chainDescriptor,
                amount,
                rewardsAmount,
                dateCreated,
                status,
                inProgress,
              },
              index
            ) => (
              <div
                key={id}
                className={`${index % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'} grid grid-cols-subgrid col-span-2 md:col-span-7 p-4`}
              >
                <div className="md:hidden text-label-light-secondary m-2">
                  ID
                </div>
                <div
                  className={
                    'text-left md:text-center font-medium underline ui-text-blue-700 m-2'
                  }
                >
                  <Link
                    className="flex hover:opacity-50"
                    href={`/staking/positions?stakingPositionId=${id}`}
                  >
                    <span className="font-mono">{id}</span>
                    <Image
                      className="ms-1.5"
                      src={LinkIcon}
                      alt="Link"
                      width={18}
                      height={18}
                    />
                  </Link>
                </div>

                <div className="md:hidden text-label-light-secondary m-2">
                  Cryptocurrency
                </div>
                <div className="font-bold m-2">
                  <CryptoId
                    id={chainDescriptor}
                    className="md:justify-center"
                  />
                </div>

                <div className="md:hidden text-label-light-secondary m-2">
                  Amount
                </div>
                <div className="text-left md:text-center font-mono m-2">
                  <span className="rounded border p-1">{amount}</span>
                </div>

                <div className="md:hidden text-label-light-secondary m-2">
                  Rewards Amount
                </div>
                <div className="text-left md:text-center font-mono m-2">
                  <span className="rounded border p-1">{rewardsAmount}</span>
                </div>

                <div className="md:hidden text-label-light-secondary m-2">
                  Date Created
                </div>
                <div className="text-left md:text-center m-2 font-mono">
                  {formatDateTime(new Date(dateCreated))}
                </div>

                <div className="md:hidden text-label-light-secondary m-2">
                  Status
                </div>
                <div className="text-left md:text-center m-2">
                  <StakingPositionStatusLabel status={status} />
                </div>

                <div className="md:hidden text-label-light-secondary m-2">
                  In Progress
                </div>
                <div className="text-left md:text-center m-2">
                  {inProgress ? 'Yes' : 'No'}
                </div>
              </div>
            )
          )}
        </div>
      );
    }
  }
  return content;
};

export default StakingPositionsTable;
