import { VaultStakingPositionStatus } from '@/types';
import React from 'react';

interface VaultStakingPositionStatusLabelProps {
  status: VaultStakingPositionStatus;
}

const VaultStakingPositionStatusLabel: React.FC<
  VaultStakingPositionStatusLabelProps
> = ({ status }) => {
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
    case 'withdrawn':
      statusColor = 'green';
      break;
    case 'canceled':
    case 'deactivated':
      statusColor = 'gray';
      break;
  }
  return (
    <code
      className="rounded bg-bg-dark-tertiary p-1 font-mono"
      style={{ backgroundColor: statusColor }}
    >
      {status}
    </code>
  );
};

export default VaultStakingPositionStatusLabel;
