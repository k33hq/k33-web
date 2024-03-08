import { Amount } from '@/types';

export const formatCurrency = (amount: Amount) => {
  const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: amount.currency,
  });
  return currencyFormatter.format(amount.value);
};
export const formatNumber = (value: number) => {
  const numberFormatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 15,
  });
  return numberFormatter.format(value);
};
export const formatPercent = (value: number) => {
  const numberFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  return numberFormatter.format(value / 100.0);
};
