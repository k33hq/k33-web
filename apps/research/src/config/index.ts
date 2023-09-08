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
      url: '/market-insights',
      children: [
        {
          key: 'quick-takes',
          label: 'Quick Takes',
          url: '/market-insights/quick-takes',
        },
        {
          key: 'weekly-reports',
          label: 'Weekly Reports',
          url: '/market-insights/weekly-reports',
        },
        {
          key: 'monthly-outlooks',
          label: 'Monthly Outlooks',
          url: '/market-insights/monthly-outlooks',
        },
      ],
    },
    {
      key: 'token-valuation',
      label: 'Token Valuation',
      url: '/token-valuation',
      children: [
        {
          key: 'indexes',
          label: 'Indexes',
          url: '/token-valuation/indexes',
        },
        {
          key: 'analysis',
          label: 'Analysis',
          url: '/token-valuation/analysis',
        },
        {
          key: 'valuation-principles',
          label: 'Valuation Principles',
          url: '/token-valuation/valuation-principles',
        },
      ],
    },
    {
      key: 'industry-insights',
      label: 'Industry Insights',
      url: '/industry-insights',
      children: [
        {
          key: 'industry-reports',
          label: 'Industry Reports',
          url: '/industry-insights/industry-reports',
        },
        {
          key: 'industry-coverage',
          label: 'Industry Coverage',
          url: '/industry-insights/industry-coverage',
        },
        {
          key: 'news',
          label: 'News',
          url: '/industry-insights/news',
        },
      ],
    },
  ],
  payments: {
    productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID! as string,
    annualPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
  },

  notifications: {
    69882: {
      description:
        'Our carefully distilled newsletter delivered to your inbox every Friday. We take great pride in delivering you the most important news only, explaining them in plain English, and analyzing the potential implications.',
    },
    69881: {
      description:
        'A weekly research note looking at what’s brewing in crypto and DeFi. Delivered directly to your inbox.',
    },
    69879: {
      description:
        'The weekly market report with signals from the derivatives market, market structure and expert opinion. Delivered directly to your inbox.',
    },
  },
};
