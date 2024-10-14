'use client';

import React from 'react';
import { Amount } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface BalanceCardProps {
  amount: Amount;
  className?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ amount, className }) => {
  return (
    <div className={className}>
      <h1 className="text-2xl mb-2 font-bold text-label-dark-secondary">
        Balance
      </h1>
      <p className="text-label-dark-primary">{formatCurrency(amount)}</p>
    </div>
  );
};

export default BalanceCard;
