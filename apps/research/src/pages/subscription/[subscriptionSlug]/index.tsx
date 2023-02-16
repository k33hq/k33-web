import * as React from 'react';
import { getAllSubscriptionSlugs, getSubscriptionBySlug } from '@/api';
import { PrivateLayout } from '@/layouts';
import { SubscriptionPage } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';
import { getCustomerId } from 'core';
import { checkout } from '@/utils';

interface SubscriptionProps {
  subscription: SubscriptionPage;
}

const Subscription: NextPageWithLayout<SubscriptionProps> = ({
  subscription,
}) => {
  const router = useRouter();

  React.useEffect(() => {
    const customerID = getCustomerId();
    if (customerID) {
      if (subscription.subscription.stripeProductId === 'free') {
        router.push('/home');
      } else {
        checkout(subscription.subscription.stripeProductId, customerID);
      }
    }
  }, [router, subscription]);

  return <div id="subscription"></div>;
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
