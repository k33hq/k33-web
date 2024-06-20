import { Pair, PerformanceStats, Term } from '@/api';

export interface FundInfoCollection {
  items: FundInfo[];
}

export interface GetFundInfoResponse {
  fundInfoCollection: FundInfoCollection;
}

export interface FundInfo {
  pdf: File;
  strategy: FundCardInfo;
  position: FundCardInfo;
  summary: Summary;
  performance: PerformanceInfo;
  facts: PairInfo;
  terms: Terms;
  providers: PairInfo;
}

export interface FundCardInfo {
  title: string;
  subtitle: string;
  description: string;
  description2: string;
}

export interface Summary {
  title: string;
  description: string;
}

export interface PerformanceInfo {
  title: string;
  subtitle: string;
  image: ImageFile;
  dataCollection: PerformanceStatsCollection;
}

export interface PerformanceStatsCollection {
  items: PerformanceStats[];
}

export interface PairInfo {
  title: string;
  dataCollection: PairCollection;
}

export interface PairCollection {
  items: Pair[];
}

export interface Terms {
  title: string;
  label: Term;
  dataCollection: TermCollection;
}

export interface TermCollection {
  items: Term[];
}

export interface File {
  url: string;
}

export interface ImageFile {
  url: string;
  width: number;
  height: number;
}
