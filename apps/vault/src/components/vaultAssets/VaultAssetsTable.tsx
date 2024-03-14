'use client';

import * as React from 'react';
import { Amount, VaultAsset } from '@/types';
import { formatCurrency, formatNumber, formatPercent } from './formatters';
import Image from 'next/image';
import QrCodeIcon from '../../assets/qrcode-icon.png';

interface VaultAssetsProps {
  vaultAssets: VaultAsset[];
  total: Amount;
  showAssetAddress: (assetId: string) => void;
}

const VaultAssetsBalanceTable: React.FC<VaultAssetsProps> = ({
  vaultAssets,
  total,
  showAssetAddress,
}) => {
  return (
    <div
      className={
        'border-collapse grid grid-cols-auto sm:grid-cols-[auto_auto] md:grid-cols-[repeat(6,auto)] gap-2'
      }
    >
      <div
        className={
          'bg-bg-dark-tertiary text-label-dark-secondary hidden md:grid grid-cols-subgrid col-span-6'
        }
      >
        <div className={'ps-2'}>Cryptocurrency</div>
        <div className={'text-right text-nowrap'}>
          Units (balance available)
          <br />
          (A)
        </div>
        <div className={'text-right text-nowrap'}>
          Rate per unit
          <br />
          (B)
        </div>
        <div className={'text-right text-nowrap'}>
          Net Asset Value
          <br />
          (A × B)
        </div>
        <div className={'text-right text-nowrap'}>24hr % change</div>
        <div className={'text-center pe-2 text-nowrap'}>Addresses</div>
      </div>
      {vaultAssets.map(
        ({ id, available, rate, fiatValue, dailyPercentChange }, index) => (
          <div
            key={id}
            className={`${index % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'} grid grid-cols-subgrid sm:col-span-2 md:col-span-6 p-2`}
          >
            <div className={'sm:col-span-2 md:col-span-1 font-medium'}>
              {id}
            </div>
            <div className={'md:hidden text-label-light-secondary'}>
              Units (balance available) (A):
            </div>
            <div className={'font-mono text-right text-nowrap'}>
              {formatNumber(available)}
            </div>

            {rate ? (
              <>
                <div className={'md:hidden text-label-light-secondary'}>
                  Rate per unit (B):
                </div>
                <div className={'font-mono text-right'}>
                  {formatCurrency(rate)}
                </div>
              </>
            ) : (
              <div className={'col-span-2 md:col-span-1'} />
            )}
            {fiatValue ? (
              <>
                <div className={'md:hidden text-label-light-secondary'}>
                  Net Asset Value (A × B):
                </div>
                <div className={'font-mono text-right'}>
                  {formatCurrency(fiatValue)}
                </div>
              </>
            ) : (
              <div className={'col-span-2 md:col-span-1'} />
            )}
            {dailyPercentChange ? (
              <>
                <div className={'md:hidden text-label-light-secondary'}>
                  24hr % change:
                </div>
                <div className={'font-mono text-right'}>
                  {formatPercent(dailyPercentChange)}
                </div>
              </>
            ) : (
              <div className={'col-span-2 md:col-span-1'} />
            )}
            <div className={'md:hidden text-label-light-secondary'}>
              Address:
            </div>
            <div className={'flex flex-row justify-center pe-2 text-right'}>
              <Image
                className={'w-7'}
                src={QrCodeIcon}
                alt={'Address'}
                onClick={() => showAssetAddress(id)}
              />
            </div>
          </div>
        )
      )}
      <div
        key={'total'}
        className={`grid grid-cols-subgrid sm:col-span-2 md:col-span-6 px-2 font-mono font-semibold ${vaultAssets.length % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'}`}
      >
        <div className={'hidden sm:col-span-2 md:grid'} />
        <div className={'text-center'}>Total</div>
        <div className={'border right-2 text-right'}>
          {formatCurrency(total)}
        </div>
      </div>
    </div>
  );
};

export default VaultAssetsBalanceTable;
