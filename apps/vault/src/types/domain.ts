export interface Asset {
  id: string;
  available?: number;
  pending?: number;
  staked?: number;
  total: number;
  rate?: Amount;
  fiatValue?: Amount;
  dailyPercentChange?: number;
}

export interface Amount {
  value: number;
  currency: string;
}

export interface AssetAddress {
  assetId: string;
  address: string;
  addressFormat?: string;
  legacyAddress?: string;
  tag?: string;
}

export interface Transaction {
  id: string;
  createdAt: string;
  operation: string;
  direction: string;
  assetId: string;
  amount: string;
  netAmount: string;
  amountUSD: string;
  feeCurrency: string;
  fee: string;
}

export interface StakingAsset {
  id: string;
  available?: string;
  pending?: string;
  staked?: string;
}

export type StakingPositionStatus =
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

export interface StakingPosition {
  id: string;
  vaultAccountId: string;
  validatorName: string;
  providerName: string;
  chainDescriptor: string;
  amount: string;
  rewardsAmount: string;
  dateCreated: string;
  status: StakingPositionStatus;
  relatedTransactions: RelatedTransaction[];
  validatorAddress: string;
  providerId: string;
  availableActions: UpdateStakingPositionAction[];
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

export interface StakingProvider {
  id: string;
  providerName: string;
  validators: StakingValidator[];
  iconUrl: string;
  termsOfServiceUrl: string;
}

export interface StakingValidator {
  chainDescriptor: string;
  feePercent: number;
}

export type StakingProviderValidator = Omit<StakingProvider, 'validators'> & {
  feePercent: number;
};

export enum UpdateStakingPositionActionLabel {
  unstake = 'Unstake',
  claimRewards = 'Claim Rewards',
  withdraw = 'Withdraw',
}

export type UpdateStakingPositionAction =
  keyof typeof UpdateStakingPositionActionLabel;

export interface TransactionSearchParams {
  afterDate: string;
  beforeDate: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface Settings {
  currency: string;
}
