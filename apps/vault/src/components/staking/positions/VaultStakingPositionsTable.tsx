import * as React from 'react';
import { VaultStakingPosition } from '@/types';
import Link from 'next/link';
import { VaultStakingPositionStatusLabel } from '@/components';
import { BasicButton } from 'ui';
import { formatDateTime, formatNumber } from '@/utils/formatters';

interface VaultStakingPositionsTableProps {
  vaultStakingPositions: VaultStakingPosition[];
}

const VaultStakingPositionsTable: React.FC<VaultStakingPositionsTableProps> = ({
  vaultStakingPositions,
}) => {
  return (
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
        <div className="text-center text-nowrap">Chain descriptor</div>
        <div className="text-center text-nowrap">Amount</div>
        <div className="text-center text-nowrap">Rewards Amount</div>
        <div className="text-center text-nowrap">Date Created</div>
        <div className="text-center text-nowrap">Status</div>
        <div className="text-center text-nowrap">In Progress</div>
      </div>
      {vaultStakingPositions.map(
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
            <div className="md:hidden text-label-light-secondary m-2">ID</div>
            <div
              className={
                'text-left md:text-center font-medium underline ui-text-blue-700'
              }
            >
              <Link href={`/staking/positions/${id}`}>
                <BasicButton size="medium" variant="secondary">
                  {id}
                </BasicButton>
              </Link>
            </div>

            <div className="md:hidden text-label-light-secondary m-2">
              Chain descriptor
            </div>
            <div className="text-left md:text-center font-bold m-2">
              {chainDescriptor}
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
            <div className="text-left md:text-center m-2">
              {formatDateTime(new Date(dateCreated))}
            </div>

            <div className="md:hidden text-label-light-secondary m-2">
              Status
            </div>
            <div className="text-left md:text-center m-2">
              <VaultStakingPositionStatusLabel status={status} />
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
};

export default VaultStakingPositionsTable;
