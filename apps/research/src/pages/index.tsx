import { getAllSubscriptions } from '@/api';
import { ResearchHeader, SubscriptionElement, CitedBy } from '@/components';
import { Subscriptions } from '@/types';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { BasicButton } from 'ui';

interface ResearchProps {
  subscriptions: Subscriptions;
}
// TODO: put this on contentful
const Research: NextPage<ResearchProps> = ({ subscriptions }) => {
  const router = useRouter();
  return (
    <div className="px-6 md:container md:px-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
        {subscriptions.map((subscription) => (
          <SubscriptionElement
            subscription={subscription}
            key={subscription.stripeProductId}
          />
        ))}
      </div>
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
