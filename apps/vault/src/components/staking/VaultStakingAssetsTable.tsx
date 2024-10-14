import * as React from 'react';
import { VaultStakingAsset } from '@/types';
import { BasicButton } from 'ui';

interface StakingVaultAssetsTableProps {
  vaultStakingAssets: VaultStakingAsset[];
}

const VaultStakingAssetsTable: React.FC<StakingVaultAssetsTableProps> = ({
  vaultStakingAssets,
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
        <div className="ps-2 text-center text-nowrap">Cryptocurrency</div>
        <div className="text-center text-nowrap">Available</div>
        <div className="text-center text-nowrap">Pending</div>
        <div className="text-center text-nowrap">Staked</div>
      </div>
      {vaultStakingAssets.map(({ id, available, pending, staked }, index) => (
        <div
          key={id}
          className={`${index % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'} grid grid-cols-subgrid col-span-2 md:col-span-4 p-2`}
        >
          <div className="text-center col-span-2 md:col-span-1 font-medium">
            {id}
          </div>

          {available ? (
            <div className="py-3 md:py-0 col-span-2 text-center md:col-span-1">
              <span className="md:hidden text-label-light-secondary">
                Available:
              </span>
              <span className="rounded border p-1 font-mono">{available}</span>
              <span className="px-1">
                <BasicButton variant="secondary" size="small" type="button">
                  <span className="p-1">Stake</span>
                </BasicButton>
              </span>
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

export default VaultStakingAssetsTable;
