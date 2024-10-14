'use client';

import { StakingPositionStatus } from '@/types';
import React from 'react';

interface StakingPositionStatusLabelProps {
  status: StakingPositionStatus;
}

const StakingPositionStatusLabel: React.FC<StakingPositionStatusLabelProps> = ({
  status,
}) => {
  let statusColor = 'gray';
  switch (status) {
    case 'error':
    case 'failed':
      statusColor = 'red';
      break;
    case 'creating':
    case 'activating':
    case 'pending':
    case 'deactivating':
    case 'withdrawing':
      statusColor = 'orange';
      break;
    case 'active':
      statusColor = 'green';
      break;
    case 'withdrawn':
    case 'canceled':
    case 'deactivated':
      statusColor = 'gray';
      break;
  }
  return (
    <code
      className="rounded bg-bg-dark-tertiary p-1 font-mono text-label-dark-primary"
      style={{ backgroundColor: statusColor }}
    >
      {status}
    </code>
  );
};

export default StakingPositionStatusLabel;
