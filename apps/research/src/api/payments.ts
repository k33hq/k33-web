import { stripe } from './client';

export const getSubscriptions = async () => {
  const products = await stripe.products.list();
  return products;
};
