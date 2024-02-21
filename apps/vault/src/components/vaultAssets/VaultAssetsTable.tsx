'use client';

import * as React from 'react';
import { Amount, VaultAsset } from '@/types';
import { formatCurrency, formatNumber, formatPercent } from './formatters';
import { BasicButton } from 'ui';
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
    <div className={'border-collapse'}>
      <div
        className={
          'bg-bg-dark-tertiary text-label-dark-secondary hidden md:flex flex-row'
        }
      >
        <div className={'basis-1/5 ps-2'}>Cryptocurrency</div>
        <div className={'basis-1/5 text-right text-nowrap'}>
          Units (balance available)
          <br />
          (A)
        </div>
        <div className={'basis-1/5 text-right text-nowrap'}>
          Rate per unit
          <br />
          (B)
        </div>
        <div className={'basis-1/5 text-right text-nowrap'}>
          Net Asset Value
          <br />
          (A × B)
        </div>
        <div className={'basis-1/5 text-right text-nowrap'}>Daily % change</div>
        <div className={'basis-1/5 text-center pe-2 text-nowrap'}>
          Addresses
        </div>
      </div>
      {vaultAssets.map(
        ({ id, available, rate, fiatValue, dailyPercentChange }, index) => (
          <div
            key={id}
            className={`${index % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'} flex flex-col md:flex-row p-2`}
          >
            <div className={'font-medium md:basis-1/6'}>
              <span className={'md:hidden text-label-light-secondary'}>
                Cryptocurrency:{' '}
              </span>
              {id}
            </div>
            <div className={'font-mono text-right md:basis-1/6 text-nowrap'}>
              <span
                className={'md:hidden text-label-light-secondary text-left'}
              >
                Units (balance available) (A):{' '}
              </span>
              {formatNumber(available)}
            </div>
            <div className={'font-mono text-right md:basis-1/6'}>
              {rate ? (
                <>
                  <span className={'md:hidden text-label-light-secondary'}>
                    Rate per unit (B):{' '}
                  </span>
                  {formatCurrency(rate)}
                </>
              ) : (
                ''
              )}
            </div>
            <div className={'font-mono text-right md:basis-1/6'}>
              {fiatValue ? (
                <>
                  <span className={'md:hidden text-label-light-secondary'}>
                    Net Asset Value (A × B):{' '}
                  </span>
                  {formatCurrency(fiatValue)}
                </>
              ) : (
                ''
              )}
            </div>
            <div className={'font-mono text-right md:basis-1/6'}>
              {dailyPercentChange ? (
                <>
                  <span className={'md:hidden text-label-light-secondary'}>
                    Daily % change:{' '}
                  </span>
                  {formatPercent(dailyPercentChange)}
                </>
              ) : (
                ''
              )}
            </div>
            <div
              className={
                'flex flex-row justify-center pe-2 text-right md:basis-1/6'
              }
            >
              <span className={'md:hidden text-label-light-secondary'}>
                Address:{' '}
              </span>
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
        className={`hidden md:flex flex-row px-2 font-mono font-semibold ${vaultAssets.length % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'}`}
      >
        <div className={'basis-2/6'}></div>
        <div className={'basis-1/6 text-center'}>Total</div>
        <div className={'basis-1/6 border right-2 text-right'}>
          {formatCurrency(total)}
        </div>
      </div>
    </div>
  );
};

export default VaultAssetsBalanceTable;
