import * as React from 'react';
import { getAllSubscriptionSlugs, getSubscriptionBySlug } from '@/api';
import { PrivateLayout } from '@/layouts';
import { SubscriptionPage } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';
import { getTitle, useAppState } from 'platform-js';
import config from '@/firebase/config';
import Head from 'next/head';
import { useStripeSubscriber } from '@/hooks';
import { useCheckoutMutation } from '@/services';

interface SubscriptionProps {
  subscription: SubscriptionPage;
}

const Subscription: NextPageWithLayout<SubscriptionProps> = ({
  subscription,
}) => {
  const [checkout, { isLoading, isSuccess, data, error, isError }] =
    useCheckoutMutation();
  const state = useAppState(config);
  const route = useRouter();
  const sub = useStripeSubscriber();

  React.useEffect(() => {
    const doCheckout = async () => {
      try {
        const payload = await checkout({
          price_id: subscription.subscription.stripeProductId,
          success_url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/settings`,
          cancel_url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/settings`,
        }).unwrap();
        window.location.href = payload.url;
      } catch (err) {
        console.log('error');
        route.push('/home');
      }
    };

    // if (subscription.subscription.stripeProductId == 'free' || sub === 'pro') {
    //   route.push('/home');
    // } else {
    //   doCheckout();
    // }

    if (state === 'REGISTRED') {
      doCheckout();
    }
  }, [state]);

  return (
    <div id="subscription">
      <Head>
        <title>{getTitle(subscription.title)}</title>
      </Head>
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
