import { getAllSubscriptions } from '@/api';
import { SubscriptionElement } from '@/components';
import { Subscriptions } from '@/types';
import { GetStaticProps, NextPage } from 'next';

interface ResearchProps {
  subscriptions: Subscriptions;
}

const Research: NextPage<ResearchProps> = ({ subscriptions }) => {
  return (
    <div className="md:container px-6 md:px-0 py-20">
      <p className="text-heading8 md:text-heading7 text-label-light-primary">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
          {subscriptions.map((subscription) => (
            <SubscriptionElement
              subscription={subscription}
              key={subscription.stripeProductId}
            />
          ))}
        </div>
      </p>
    </div>
  );
};

export default Research;

export const getStaticProps: GetStaticProps<ResearchProps> = async () => {
  const subscriptions = await getAllSubscriptions();
  return {
    props: {
      subscriptions,
    },
  };
};
