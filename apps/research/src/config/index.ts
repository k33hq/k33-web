import { AppStructure } from '@/types';

export const appStructure: AppStructure = {
  navigation: [
    {
      key: 'home',
      label: 'Home',
      url: '/',
    },
    {
      key: 'ahead-of-the-curve',
      label: 'Ahead of the Curve',
      url: '/ahead-of-the-curve',
      image: './aoc_header.svg',
    },
    {
      key: 'navigating-narratives',
      label: 'Navigating Narratives',
      url: '/navigating-narratives',
      image: './nn_header.svg',
    },
    {
      key: 'this-week-in-crypto',
      label: 'This Week in Crypto',
      url: '/this-week-in-crypto',
      image: './twic_header.svg',
    },
    {
      key: 'industry-reports',
      label: 'Industry Reports',
      url: '/industry-reports',
    },
    {
      key: 'kvq',
      label: 'KVQ',
      url: '/kvq',
    },
    { key: 'archive', label: 'Archive', url: '/articles' },
    // {
    //   key: 'market-insights',
    //   label: 'Market Insights',
    //   url: '/market-insights',
    //   children: [
    //     {
    //       key: 'quick-takes',
    //       label: 'Quick Takes',
    //       url: '/market-insights/quick-takes',
    //     },
    //     {
    //       key: 'weekly-reports',
    //       label: 'Weekly Reports',
    //       url: '/market-insights/weekly-reports',
    //     },
    //     {
    //       key: 'monthly-outlooks',
    //       label: 'Monthly Outlooks',
    //       url: '/market-insights/monthly-outlooks',
    //     },
    //   ],
    // },
    // {
    //   key: 'token-valuation',
    //   label: 'Token Valuation',
    //   url: '/token-valuation',
    //   children: [
    //     {
    //       key: 'indexes',
    //       label: 'Indexes',
    //       url: '/token-valuation/indexes',
    //     },
    //     {
    //       key: 'analysis',
    //       label: 'Analysis',
    //       url: '/token-valuation/analysis',
    //     },
    //     {
    //       key: 'valuation-principles',
    //       label: 'Valuation Principles',
    //       url: '/token-valuation/valuation-principles',
    //     },
    //   ],
    // },
    // {
    //   key: 'industry-insights',
    //   label: 'Industry Insights',
    //   url: '/industry-insights',
    //   children: [
    //     {
    //       key: 'industry-reports',
    //       label: 'Industry Reports',
    //       url: '/industry-insights/industry-reports',
    //     },
    //     {
    //       key: 'industry-coverage',
    //       label: 'Industry Coverage',
    //       url: '/industry-insights/industry-coverage',
    //     },
    //     {
    //       key: 'news',
    //       label: 'News',
    //       url: '/industry-insights/news',
    //     },
    //   ],
    // },
  ],
  payments: {
    // default: {
    //   productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID! as string,
    //   annualPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
    //   monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
    // },
    twic: {
      productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID_TWIC! as string,
      annualPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID_TWIC!,
      monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TWIC!,
      image: '/research/twic_product.svg',
      name: 'This Week in Crypto',
      description:
        'Our carefully distilled newsletter delivered to your inbox every Friday. We take great pride in delivering you the most important news only, explaining them in plain English, and analysing the potential implications.',
      monthlyPrice: '$10.00',
      yearlyPrice: '$100.00',
      features: [
        'Our carefully distilled weekly newsletter – your one-stop-shop for crypto news',
        'The most important news only and explanations of the implications',
        'Delivered to your inbox every Friday',
      ],
    },
    nn: {
      productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID_NN! as string,
      annualPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID_NN!,
      monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_NN!,
      image: '/research/nn_product.svg',
      name: 'Navigating Narratives',
      description:
        'A weekly research note looking at what’s brewing in crypto and DeFi. Delivered directly to your inbox.',
      monthlyPrice: '$25.00',
      yearlyPrice: '$250.00',
      features: [
        'A weekly research note looking at what’s brewing in crypto and DeFi',
        'Which projects to look at and how to manage DeFi trading',
        'Delivered directly to your inbox every Wednesday',
      ],
    },
    aoc: {
      productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID_AOC! as string,
      annualPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID_AOC!,
      monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_AOC!,
      image: '/research/aoc_product.svg',
      name: 'Ahead of The Curve',
      description:
        'The weekly market report with signals from the derivatives market, market structure and expert opinion. Delivered directly to your inbox.',
      monthlyPrice: '$50.00',
      yearlyPrice: '$500.00',
      features: [
        'The weekly market report',
        'Signals from the derivatives market, market structure and expert opinion',
        'Delivered directly to your inbox every Tuesday',
      ],
    },
    pro: {
      productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID_PRO! as string,
      annualPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID_PRO!,
      monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_PRO!,
      image: '/research/pro_product.svg',
      name: 'Complete Package',
      description:
        'The weekly market report with signals from the derivatives market, market structure and expert opinion. Delivered directly to your inbox.',
      monthlyPrice: '$70.00',
      yearlyPrice: '$700.00',
      features: [
        'Ahead of the Curve – The Weekly Market Report',
        'Navigating Narratives – The Weekly DeFi Research Note',
        'This Week in Crypto – The Weekly Crypto Industry Newsletter',
      ],
    },
  },

  notifications: {
    69882: {
      description:
        'Our carefully distilled newsletter delivered to your inbox every Friday. We take great pride in delivering you the most important news only, explaining them in plain English, and analyzing the potential implications.',
      plan: 'twic',
    },
    69881: {
      description:
        'A weekly research note looking at what’s brewing in crypto and DeFi. Delivered directly to your inbox.',
      plan: 'nn',
    },
    69879: {
      description:
        'The weekly market report with signals from the derivatives market, market structure and expert opinion. Delivered directly to your inbox.',
      plan: 'aoc',
    },
  },
};
