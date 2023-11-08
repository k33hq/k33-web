export interface Navigation {
  key: string;
  label: string;
  url: string;
  image?: string;
  children?: Array<Navigation>;
}

export interface Payments {
  productId: string;
  annualPriceId: string;
  monthlyPriceId: string;
  image: string;
  settingsImage: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: Array<string>;
}

export type ProductPlans = 'aoc' | 'nn' | 'twic' | 'pro';
export interface AppStructure {
  navigation: Array<Navigation>;
  payments: Record<'aoc' | 'nn' | 'twic' | 'pro', Payments>;
  notifications: Record<number, { description: string; plan: ProductPlans }>;
}

// export interface PageTab {
//   key: string;
//   label: string;
// }

// export type PageTabs = Array<PageTab>;

export type Navigations = Array<Navigation>;

export type DividerConfig = boolean | { hideLast: boolean; hideFirst: boolean };

export type Plan = 'monthly' | 'year';
