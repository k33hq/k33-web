export interface Navigation {
  key: string;
  label: string;
  url: string;
  children?: Array<Navigation>;
}

export interface Payments {
  productId: string;
  annualPriceId: string;
  monthlyPriceId: string;
}

export interface AppStructure {
  navigation: Array<Navigation>;
  payments: Payments;
  notifications: Record<number, { description: string }>;
}

// export interface PageTab {
//   key: string;
//   label: string;
// }

// export type PageTabs = Array<PageTab>;

export type Navigations = Array<Navigation>;

export type DividerConfig = boolean | { hideLast: boolean; hideFirst: boolean };

export type Plan = 'monthly' | 'year';
