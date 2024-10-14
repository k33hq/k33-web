'use client';

import * as React from 'react';
import { Transaction } from '@/types';
import CryptoId from '../CryptoId';
import Link from 'next/link';
import LinkIcon from '../../assets/link-icon.svg';
import Image from 'next/image';
import { formatDateTime } from '@/utils/formatters';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  return (
    <div
      className={
        'border-collapse grid grid-cols-auto sm:grid-cols-[auto_auto] xl:grid-cols-[repeat(9,auto)]'
      }
    >
      <div
        className={
          'bg-bg-dark-tertiary text-label-dark-secondary hidden xl:grid grid-cols-subgrid col-span-9 p-3'
        }
      >
        <div className="text-center text-nowrap">ID</div>
        <div className="text-center text-nowrap">Created At</div>
        <div className="text-center text-nowrap">Operation</div>
        <div className="text-center text-nowrap">Direction</div>
        <div className="text-center text-nowrap">Cryptocurrency</div>
        <div className="text-center text-nowrap">Amount</div>
        <div className="text-center text-nowrap">Net Amount</div>
        <div className="text-center text-nowrap">Amount (USD)</div>
        <div className="text-center text-nowrap">Fee</div>
      </div>
      {transactions.map(
        (
          {
            id,
            createdAt,
            operation,
            direction,
            assetId,
            amount,
            netAmount,
            amountUSD,
            feeCurrency,
            fee,
          },
          index
        ) => (
          <div
            key={id}
            className={`${index % 2 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'} grid grid-cols-subgrid col-span-2 xl:col-span-9 p-2 xl:text-[14px]`}
          >
            <div className="py-3 xl:py-0 col-span-2 justify-center xl:col-span-1 flex">
              <span className="xl:hidden text-label-light-secondary">ID:</span>
              <Link
                className="flex hover:opacity-50"
                href={`/transactions/${id}`}
              >
                <span className="font-mono text-nowrap">{id}</span>
                <Image
                  className="ms-1.5"
                  src={LinkIcon}
                  alt="Link"
                  width={18}
                  height={18}
                />
              </Link>
            </div>

            <div className="py-3 xl:py-0 col-span-2 text-center xl:col-span-1">
              <span className="xl:hidden text-label-light-secondary">
                Created At:
              </span>
              <span className="rounded border p-1 font-mono">
                {formatDateTime(new Date(createdAt))}
              </span>
            </div>

            <div className="py-3 xl:py-0 col-span-2 text-center xl:col-span-1">
              <span className="xl:hidden text-label-light-secondary">
                Operation:
              </span>
              <span className="">{operation}</span>
            </div>

            <div className="py-3 xl:py-0 col-span-2 text-center xl:col-span-1">
              <span className="xl:hidden text-label-light-secondary">
                Direction:
              </span>
              <span className="">{direction}</span>
            </div>

            <div className="py-3 xl:py-0 col-span-2 justify-center xl:col-span-1 flex">
              <span className="xl:hidden text-label-light-secondary">
                Cryptocurrency:
              </span>
              <CryptoId id={assetId} />
            </div>

            <div className="py-3 xl:py-0 col-span-2 text-center xl:col-span-1">
              <span className="xl:hidden text-label-light-secondary">
                Amount:
              </span>
              <span className="rounded border p-1 font-mono">{amount}</span>
            </div>

            <div className="py-3 xl:py-0 col-span-2 text-center xl:col-span-1">
              <span className="xl:hidden text-label-light-secondary">
                Net Amount:
              </span>
              <span className="rounded border p-1 font-mono">{netAmount}</span>
            </div>

            <div className="py-3 xl:py-0 col-span-2 text-center xl:col-span-1">
              <span className="xl:hidden text-label-light-secondary">
                Amount (USD):
              </span>
              <span className="rounded border p-1 font-mono">
                {'$'}
                {amountUSD}
              </span>
            </div>

            <div className="py-3 xl:py-0 col-span-2 text-center xl:col-span-1">
              <span className="xl:hidden text-label-light-secondary">Fee:</span>
              <span className="rounded border p-1 font-mono">
                {feeCurrency} {fee}
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TransactionsTable;
