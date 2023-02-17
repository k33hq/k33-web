import { getAllSubscriptions } from '@/api';
import { ResearchHeader, SubscriptionElement, CitedBy } from '@/components';
import { Subscriptions } from '@/types';
import { GetStaticProps, NextPage } from 'next';
import { BasicButton } from 'ui';

interface ResearchProps {
  subscriptions: Subscriptions;
}
// TODO: put this on contentful
const Research: NextPage<ResearchProps> = ({ subscriptions }) => {
  return (
    <div className="px-6 md:px-0">
      <div className="bg-scroll bg-landing bg-blend-soft-light bg-center bg-no-repeat bg-cover bg-brand-light-primary h-[544px] w-full">
        <ResearchHeader categories={[]} />
        <div className="md:container flex flex-col items-center gap-8 mt-16">
          <div className="text-brand-dark-primary flex flex-col items-center justify-center content-center gap-2">
            <h5 className="text-heading5">
              Understand the digital assets industry,
            </h5>
            <h5 className="text-heading6 ">
              from short-term market signals to long-term fundamentals.
            </h5>
          </div>
          <BasicButton variant="secondary">Get Access Now</BasicButton>
          <CitedBy />
        </div>
      </div>
      <div className="flex md:container flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
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
