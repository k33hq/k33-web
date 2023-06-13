import { AppStructure } from '@/types';

export const appStructure: AppStructure = {
  navigation: [
    {
      key: 'home',
      label: 'Home',
      url: '/',
    },
    {
      key: 'market-insight',
      label: 'Market Insights',
      url: '/market-insights/quick-takes',
    },
    {
      key: 'token-valuation',
      label: 'Token Valuation',
      url: '/token-valuation/analysis',
    },
    {
      key: 'industry-insights',
      label: 'Industry Insights',
      url: '/industry-insights/coverage',
    },
  ],
};
