import { AppStructure } from '@/types';

export const appStructure: AppStructure = {
  navigation: [
    {
      key: 'home',
      label: 'Home',
      url: '/',
    },
    {
      key: 'market-insights',
      label: 'Market Insights',
      url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/market-insights/quick-takes`,
    },
    {
      key: 'token-valuation',
      label: 'Token Valuation',
      url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/token-valuation/analysis`,
    },
    {
      key: 'industry-insights',
      label: 'Industry Insights',
      url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/industry-insights/industry-reports`,
    },
  ],
};
