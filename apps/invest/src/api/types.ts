export interface FundInfo {
  strategy: FundCardInfo;
  position: FundCardInfo;
  performance: PerformanceInfo;
  summary: FundCardInfo;
  facts: PairInfo;
  terms: Terms;
  providers: PairInfo;
}

export interface FundCardInfo {
  title: string;
  subtitle: string;
  description: string[];
}

export interface PerformanceInfo {
  title: string;
  subtitle: string;
  data: PerformanceStats[];
}

export interface PerformanceStats {
  duration: string;
  k33: number;
  btc: number;
}

export interface PairInfo {
  title: string;
  data: Pair[];
}

export interface Pair {
  key: string;
  value: string;
}

export interface Terms {
  title: string;
  label: Term;
  data: Term[];
}

export interface Term {
  key: string;
  value: string;
  value2?: string;
}
