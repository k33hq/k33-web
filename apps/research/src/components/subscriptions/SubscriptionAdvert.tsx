import config from '@/firebase/config';
import {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
} from '@/services';
import { ProductStatus } from '@/types';
import Link from 'next/link';
import { useAppState } from 'platform-js';
import * as React from 'react';
import { BasicButton } from 'ui';

interface SubscriptionAdvertProps {
  priceId: string;
  productId: string;
  overRideSubscriptionCheck?: boolean;
  children: React.ReactNode;
}

const SubscriptionAdvert: React.FC<SubscriptionAdvertProps> = ({
  priceId,
  productId,
  children,
  overRideSubscriptionCheck = false,
}) => {
  const [checkout] = useCheckoutMutation();
  const [productInfoStatus, setProductInfoStatus] = React.useState<
    ProductStatus | null | 'loading'
  >('loading');
  const state = useAppState(config);
  const [getProductsInfoTrigger] = useLazyGetProductInfoQuery();
  const [dashboard] = useCustomerMutation();

  const privateStates = ['SIGNED_OUT'];

  React.useEffect(() => {
    const getProductsInfo = async () => {
      try {
        const data = await getProductsInfoTrigger(productId).unwrap();
        setProductInfoStatus(data.status);
      } catch (err) {
        setProductInfoStatus(null);
      }
    };
    getProductsInfo();
  }, [state, getProductsInfoTrigger, productId]);

  // implementation details
  const doCheckOut = async () => {
    try {
      const response = await checkout({
        price_id: priceId,
        success_url: window.location.href,
        cancel_url: window.location.href,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {
      //nothing for now
    }
  };

  const customerDashboard = async () => {
    try {
      const response = await dashboard({
        return_url: window.location.href,
      }).unwrap();

      let a = document.createElement('a');
      document.body.appendChild(a);
      //@ts-ignore
      a.style = 'display: none';
      a.href = response.url;
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  };

  if (privateStates.includes(state))
    return (
      <CallToAction
        title="Keep reading with a 30-day free trial"
        subtitle="Subscribe to K33 Research Pro to keep reading and get 30 days of full access to all our research."
      >
        <div className="items-center justify-center text-center flex flex-col lg:gap-4">
          <Link href={process.env.NEXT_PUBLIC_PLATFORM_URL + '/auth'}>
            <BasicButton variant="secondary">Sign Up & Start Trial</BasicButton>
          </Link>

          <div className="flex flex-row gap-1">
            <p className="md:text-body2 text-small text-label-dark-primary">
              Already a paid subscriber?
            </p>
            <Link
              href={process.env.NEXT_PUBLIC_PLATFORM_URL + '/auth'}
              className="md:text-body2 text-small text-label-dark-primary underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </CallToAction>
    );

  if (overRideSubscriptionCheck) {
    return (
      <div className="pb-[120px] flex flex-col justify-center md:gap-8 gap-4 w-full px-6 md:px-0">
        {children}
      </div>
    );
  }

  if (productInfoStatus === 'loading') return null;

  switch (productInfoStatus) {
    case 'active':
      return (
        <div className="pb-[120px] flex flex-col justify-center md:gap-8 gap-4 w-full px-6 md:px-0">
          {children}
        </div>
      );

    case 'blocked':
      return (
        <CallToAction
          title="Update subscription to keep reading"
          subtitle="Your subscription to K33 Research Pro gets you full access to all our research."
        >
          <BasicButton variant="secondary" onClick={customerDashboard}>
            Update Subscription
          </BasicButton>
        </CallToAction>
      );

    case 'ended':
      return (
        <CallToAction
          title="Subscribe to keep reading our research"
          subtitle="Subscribe to K33 Research Pro to keep reading and get full access to all our research."
        >
          <BasicButton variant="secondary" onClick={doCheckOut}>
            Subscribe
          </BasicButton>
        </CallToAction>
      );

    default:
      return (
        <CallToAction
          title="Keep reading with a 30-day free trial"
          subtitle="Subscribe to K33 Research Pro to keep reading and get 30 days of full access to all our research."
        >
          <BasicButton variant="secondary" onClick={doCheckOut}>
            Start Trial
          </BasicButton>
        </CallToAction>
      );
  }
};

export default SubscriptionAdvert;

interface CallToActionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div
      id="id-subscribe"
      className="bg-bg-dark-elevated-primary md:py-14 py-8 md:px-20 px-10"
    >
      <div className="flex flex-col md:gap-10 gap-6 md:w-[439px] mx-auto">
        <div className="flex flex-col md:gap-4 items-center justify-center text-center">
          <p className="md:text-heading6 text-body1 text-label-dark-primary">
            {title}
          </p>
          <p className="md:text-body2 text-small text-label-dark-primary">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};
