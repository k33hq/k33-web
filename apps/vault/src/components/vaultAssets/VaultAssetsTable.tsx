'use client';

import * as React from 'react';
import { Amount, Asset } from '@/types';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from '@/utils/formatters';
import Image from 'next/image';
import QrCodeIcon from '../../assets/qrcode-icon.svg';
import CryptoId from '../CryptoId';

interface VaultAssetsTableProps {
  assets: Asset[];
  total: Amount;
  showAssetAddress: (assetId: string) => void;
}

const VaultAssetsTable: React.FC<VaultAssetsTableProps> = ({
  assets,
  total,
  showAssetAddress,
}) => {
  return (
    <div
      className={
        'border-collapse grid grid-cols-auto sm:grid-cols-[auto_auto] md:grid-cols-[repeat(9,auto)] gap-2'
      }
    >
      <div
        className={
          'bg-bg-dark-tertiary text-label-dark-secondary hidden md:grid grid-cols-subgrid col-span-9'
        }
      >
        <div className="ps-2">Cryptocurrency</div>
        <div className="text-right text-nowrap">
          Available
          <br />
          (a)
        </div>
        <div className="text-right text-nowrap">
          Pending
          <br />
          (p)
        </div>
        <div className="text-right text-nowrap">
          Staked
          <br />
          (s)
        </div>
        <div className="text-right text-nowrap">
          Total units (a + p + s)
          <br />
          (T)
        </div>
        <div className="text-right text-nowrap">
          Rate per unit
          <br />
          (R)
        </div>
        <div className="text-right text-nowrap">
          Net Asset Value
          <br />
          (T × R)
        </div>
        <div className="text-right text-nowrap">24hr % change</div>
        <div className="text-center pe-2 text-nowrap">Addresses</div>
      </div>
      {assets.map(
        (
          {
            id,
            available,
            pending,
            staked,
            total,
            rate,
            fiatValue,
            dailyPercentChange,
          },
          index
        ) => (
          <div
            key={id}
            className={`${index % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'} grid grid-cols-subgrid sm:col-span-2 md:col-span-9 p-2`}
          >
            <div className="sm:col-span-2 md:col-span-1 font-medium">
              <CryptoId id={id} />
            </div>

            {available ? (
              <>
                <div className="md:hidden text-label-light-secondary">
                  Available (a):
                </div>
                <div className="font-mono text-right">
                  {formatNumber(available)}
                </div>
              </>
            ) : (
              <div className="col-span-2 md:col-span-1" />
            )}

            {pending ? (
              <>
                <div className="md:hidden text-label-light-secondary">
                  Pending (p):
                </div>
                <div className="font-mono text-right">
                  {formatNumber(pending)}
                </div>
              </>
            ) : (
              <div className="col-span-2 md:col-span-1" />
            )}

            {staked ? (
              <>
                <div className="md:hidden text-label-light-secondary">
                  Staked (s):
                </div>
                <div className="font-mono text-right">
                  {formatNumber(staked)}
                </div>
              </>
            ) : (
              <div className="col-span-2 md:col-span-1" />
            )}

            <div className="md:hidden text-label-light-secondary">
              Total units (a + p + s) (T):
            </div>
            <div className="font-mono text-right text-nowrap">
              {formatNumber(total)}
            </div>

            {rate ? (
              <>
                <div className="md:hidden text-label-light-secondary">
                  Rate per unit (R):
                </div>
                <div className="font-mono text-right">
                  {formatCurrency(rate)}
                </div>
              </>
            ) : (
              <div className="col-span-2 md:col-span-1" />
            )}
            {fiatValue ? (
              <>
                <div className="md:hidden text-label-light-secondary">
                  Net Asset Value (T × R):
                </div>
                <div className="font-mono text-right">
                  {formatCurrency(fiatValue)}
                </div>
              </>
            ) : (
              <div className="col-span-2 md:col-span-1" />
            )}
            {dailyPercentChange ? (
              <>
                <div className="md:hidden text-label-light-secondary">
                  24hr % change:
                </div>
                <div className="font-mono text-right">
                  {formatPercent(dailyPercentChange)}
                </div>
              </>
            ) : (
              <div className="col-span-2 md:col-span-1" />
            )}
            <div className="md:hidden text-label-light-secondary">Address:</div>
            <div className="flex flex-row justify-center pe-2 text-right">
              <Image
                className="w-7 hover:opacity-75"
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
        className={`grid grid-cols-subgrid sm:col-span-2 md:col-span-9 px-2 font-mono font-semibold ${assets.length % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'}`}
      >
        <div className="hidden sm:col-span-5 md:grid" />
        <div className="text-center">Total</div>
        <div className="border right-2 text-right">{formatCurrency(total)}</div>
      </div>
    </div>
  );
};

export default VaultAssetsTable;
