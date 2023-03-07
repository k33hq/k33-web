import { Subscription } from '@/types';
import { getUrl } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BasicButton, ListIcon } from 'ui';

interface SubscriptionElementProps {
  subscription: Subscription;
}

const SubscriptionElement: React.FC<SubscriptionElementProps> = ({
  subscription,
}) => {
  const router = useRouter();
  return (
    <div
      id={subscription.stripeProductId}
      className="bg-bg-light-primary flex flex-col items-center shadow-xl px-6 py-10 rounded-xl justify-center content-center gap-8 w-[328px] ring-1 ring-brand-light-tertiary/20"
    >
      <div>
        <Image
          src={subscription.image.url}
          height={135}
          width={110}
          alt={subscription.image.title}
        />
      </div>
      <div id="product-title" className="flex flex-col gap-3 text-center">
        <p className="text-heading8 text-label-light-primary">
          {subscription.name}
        </p>
        <p className="text-heading8 text-label-light-secondary">
          {subscription.description}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {subscription.features.map((feature) => (
          <div key={feature} className="flex flex-row gap-2 items-start">
            <ListIcon />
            <p className="text-body2 text-label-light-secondary">{feature}</p>
          </div>
        ))}
      </div>
      <BasicButton
        onClick={() => {
          router.push(
            getUrl(
              'subscription',
              subscription.linkedFrom.subscriptionWebCollection.items[0]
                .subscriptionSlug
            )
          );
        }}
        variant="secondary"
        size="medium"
        fullWidth
      >
        {subscription.linkedFrom.subscriptionWebCollection.items[0].label}
      </BasicButton>
    </div>
  );
};

export default SubscriptionElement;
