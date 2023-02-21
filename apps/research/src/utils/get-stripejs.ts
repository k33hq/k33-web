import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;

export const checkout = async (productId: string, email: string) => {
  const stripe = await getStripe();
  const result = await stripe?.redirectToCheckout({
    lineItems: [{ price: productId, quantity: 1 }],
    mode: 'subscription',
    successUrl: process.env.NEXT_PUBLIC_PLATFORM_URL + 'home',
    cancelUrl: process.env.NEXT_PUBLIC_PLATFORM_URL as string,
    customerEmail: email,
  });
  return result;
};
