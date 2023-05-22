import { SubscriberType } from '@/types';
import { fetcher } from 'core';
import { useEffect, useState } from 'react';

export const useStripeSubscriber = () => {
  const [subscriber, setSubscriber] = useState<null | SubscriberType>(null);

  useEffect(() => {
    const getSubscriber = async () => {
      try {
        const data = await fetcher(
          `https://${process.env.NEXT_PUBLIC_API_DOMAIN}/payment/subscribed-products`
        );

        if (data.status === 404) {
          setSubscriber('free');
        } else {
          setSubscriber('pro');
        }
      } catch (err) {
        setSubscriber('free');
      }
    };

    getSubscriber();
  }, [subscriber]);

  return subscriber;
};
