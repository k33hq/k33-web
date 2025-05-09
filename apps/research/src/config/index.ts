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
      image: './aoc_header.avif',
    },
    {
      key: 'this-week-in-crypto',
      label: 'This Week in Crypto',
      url: '/this-week-in-crypto',
      image: './twic_header.avif',
    },
    {
      key: 'industry-reports',
      label: 'Industry Reports',
      url: '/industry-reports',
    },
    { key: 'articles', label: 'Archive', url: '/articles' },
  ],
  payments: {
    twic: {
      productId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID_TWIC! as string,
      annualPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID_TWIC!,
      monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TWIC!,
      image: '/research/twic_product.svg',
      settingsImage: '/research/twic_settings.svg',
      name: 'This Week in Crypto',
      description:
        'Our carefully distilled newsletter delivered to your inbox every Friday. We take great pride in delivering you the most important news only, explaining them in plain English, and analysing the potential implications.',
      monthlyPrice: '$10.00',
      pricingDescription: [
        'Stay up-to-date with a curated news summary.',
        'Gain in-depth insights into crucial trends and the implications of key events.',
        "Get a comprehensive understanding of the crypto market's weekly highlights.",
      ],
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
      settingsImage: '/research/nn_settings.svg',
      name: 'Navigating Narratives',
      description:
        'A weekly research note looking at what’s brewing in crypto and DeFi. Delivered directly to your inbox.',
      monthlyPrice: '$25.00',
      yearlyPrice: '$250.00',
      pricingDescription: [
        "Gain unique insights from an altcoin trader's perspective.",
        'Focus on the dynamic low-to-mid cap altcoin markets.',
        'Discover emerging trends and opportunities within the altcoin landscape',
      ],
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
      settingsImage: '/research/aoc_settings.svg',
      name: 'Ahead of The Curve',
      pricingDescription: [
        'Dive into market reports that provide signals from the derivatives market.',
        'Benefit from expert market structure analysis and opinions.',
        "Receive actionable insights into what's currently driving the digital assets market and how these movements may impact prices tomorrow.",
      ],
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
      settingsImage: '/research/pro_settings.svg',
      name: 'Pro',
      description:
        'Full access to all research content, including This Week in Crypto and Ahead of the Curve.',
      monthlyPrice: '$300.00',
      yearlyPrice: '$3000.00',
      pricingDescription: [],
      features: [
        'Weekly market reports keeping you up to speed',
        'Monthly outlooks helping you plan ahead',
        "DeFi insights from an altcoin trader's perspective",
        'Token assessments based on data and economic theory',
        'Industry insight from our curated news summary and in-depth reports',
        'Private Telegram Chat Group',
      ],
    },
  },

  notifications: {
    69882: {
      description:
        'Our carefully distilled newsletter delivered to your inbox every Friday. We take great pride in delivering you the most important news only, explaining them in plain English, and analyzing the potential implications.',
      plan: 'twic',
    },
    69879: {
      description:
        'The weekly market report with signals from the derivatives market, market structure and expert opinion. Delivered directly to your inbox.',
      plan: 'aoc',
    },
  },
};
