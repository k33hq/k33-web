'use client';

import * as React from 'react';
import { StakingAsset } from '@/types';
import { BasicButton } from 'ui';
import Big from 'big.js';
import { getStakingConstraints } from '@/utils/stakingRules';
import Image from 'next/image';
import ArrowTrendUpIcon from '../../assets/arrow-trend-up-icon.svg';
import CryptoId from '../CryptoId';

interface StakingAssetsTableProps {
  stakingAssets: StakingAsset[];
  onStake: (stakeAssetId: string) => void;
}

function hasBalance(available: Big): boolean {
  const { minimumStakeAmount, minimumAvailable } =
    getStakingConstraints(available);
  return available.gte(minimumStakeAmount.plus(minimumAvailable));
}

const StakingAssetsTable: React.FC<StakingAssetsTableProps> = ({
  stakingAssets,
  onStake,
}) => {
  return (
    <div
      className={
        'border-collapse grid grid-cols-auto sm:grid-cols-[auto_auto] md:grid-cols-[repeat(4,auto)]'
      }
    >
      <div
        className={
          'bg-bg-dark-tertiary text-label-dark-secondary hidden md:grid grid-cols-subgrid col-span-4 p-3'
        }
      >
        <div className="ps-2 text-nowrap">Cryptocurrency</div>
        <div className="text-center text-nowrap">Available</div>
        <div className="text-center text-nowrap">Pending</div>
        <div className="text-center text-nowrap">Staked</div>
      </div>
      {stakingAssets.map(({ id, available, pending, staked }, index) => (
        <div
          key={id}
          className={`${index % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'} grid grid-cols-subgrid col-span-2 md:col-span-4 p-2`}
        >
          <div className="col-span-2 md:col-span-1 ps-2">
            <CryptoId id={id} />
          </div>

          {available ? (
            <div className="py-3 md:py-0 col-span-2 justify-center md:col-span-1 flex">
              <span className="md:hidden text-label-light-secondary">
                Available:
              </span>
              <span className="rounded border p-1 font-mono">{available}</span>
              {hasBalance(Big(available)) && (
                <div className="ms-2">
                  <BasicButton
                    variant="secondary"
                    size="small"
                    onClick={() => onStake(id)}
                  >
                    <div className="flex p-0.5">
                      <Image
                        className="mx-1"
                        src={ArrowTrendUpIcon}
                        alt={'Stake icon'}
                        height={24}
                        width={24}
                      />
                      <span className="mx-1">Stake</span>
                    </div>
                  </BasicButton>
                </div>
              )}
            </div>
          ) : (
            <div className="col-span-2 md:col-span-1" />
          )}
          {pending ? (
            <div className="py-3 md:py-0 col-span-2 text-center md:col-span-1">
              <span className="md:hidden text-label-light-secondary">
                Pending:
              </span>
              <span className="rounded border p-1 font-mono">{pending}</span>
            </div>
          ) : (
            <div className="col-span-2 md:col-span-1" />
          )}

          {staked ? (
            <div className="py-3 md:py-0 col-span-2 text-center md:col-span-1">
              <span className="md:hidden text-label-light-secondary">
                Staked:
              </span>
              <span className="rounded border p-1 font-mono">{staked}</span>
            </div>
          ) : (
            <div className="col-span-2 md:col-span-1" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StakingAssetsTable;
