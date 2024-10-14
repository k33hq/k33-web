export interface VaultAsset {
  id: string;
  available: number;
  rate?: Amount;
  fiatValue?: Amount;
  dailyPercentChange?: number;
}

export interface Amount {
  value: number;
  currency: string;
}

export interface VaultAssetAddress {
  assetId: string;
  address: string;
  addressFormat?: string;
  legacyAddress?: string;
  tag?: string;
}

export interface VaultStakingAsset {
  id: string;
  available?: number;
  pending?: number;
  staked?: number;
}

export type VaultStakingPositionStatus =
  | 'error'
  | 'failed'
  | 'creating'
  | 'canceled'
  | 'pending'
  | 'activating'
  | 'active'
  | 'deactivating'
  | 'deactivated'
  | 'withdrawing'
  | 'withdrawn'
  | string;

export interface VaultStakingPosition {
  id: string;
  vaultAccountId: string;
  validatorName: string;
  providerName: string;
  chainDescriptor: string;
  amount: string;
  rewardsAmount: string;
  dateCreated: string;
  status: VaultStakingPositionStatus;
  relatedTransactions: Array<RelatedTransaction>;
  validatorAddress: string;
  providerId: string;
  availableActions: Array<string>;
  inProgress: boolean;
  inProgressTxId?: string;
  blockchainPositionInfo: BlockchainPositionInfo;
}

export interface RelatedTransaction {
  txId: string;
  completed: boolean;
}

export interface BlockchainPositionInfo {
  stakeAccountAddress?: string;
}

export type UpdateVaultStakingPositionAction = 'unstake' | 'claimRewards';

export interface ErrorResponse {
  code: string;
  message: string;
}
