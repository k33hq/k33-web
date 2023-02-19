import * as React from 'react';
import { getAllSubscriptionSlugs, getSubscriptionBySlug } from '@/api';
import { PrivateLayout } from '@/layouts';
import { SubscriptionPage } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';
import { getCustomerEmail, getCustomerId } from 'core';
import { checkout } from '@/utils';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';

interface SubscriptionProps {
  subscription: SubscriptionPage;
}

const Subscription: NextPageWithLayout<SubscriptionProps> = ({
  subscription,
}) => {
  const state = useAppState(config);
  const route = useRouter();

  React.useEffect(() => {
    if (subscription.subscription.stripeProductId === 'free') {
      route.push('/home');
    } else {
      const email = getCustomerEmail();
      if (email) {
        checkout(subscription.subscription.stripeProductId, email);
      }
    }
  }, [subscription, state, route]);

  return (
    <div id="subscription">
      {/* <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20">
        <p className="md:text-heading4 text-heading8">
          Redirecting to Check Out..
        </p>
      </div> */}
    </div>
  );
};

export default Subscription;

Subscription.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllSubscriptionSlugs();
  const paths = slugs.map(({ subscriptionSlug }) => ({
    params: { subscriptionSlug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SubscriptionProps> = async (
  context
) => {
  const subscriptionSlug = context.params!.subscriptionSlug as string;
  const subscription = await getSubscriptionBySlug(subscriptionSlug);

  return {
    props: {
      subscription,
    },
  };
};
