import { NextPage } from 'next';

const Subscription: NextPage = () => {
  return (
    <div className="md:container px-6 md:px-0 py-6 md:py-20">
      <stripe-pricing-table
        pricing-table-id={process.env.NEXT_PUBLIC_PRICING_TABLE_ID}
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      ></stripe-pricing-table>
    </div>
  );
};

export default Subscription;
