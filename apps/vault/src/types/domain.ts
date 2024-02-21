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
