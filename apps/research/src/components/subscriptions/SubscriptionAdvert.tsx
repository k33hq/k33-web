import config from '@/firebase/config';
import {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
} from '@/services';
import { ProductStatus } from '@/types';
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

  React.useEffect(() => {
    const getProductsInfo = async () => {
      try {
        const data = await getProductsInfoTrigger(productId).unwrap();
        setProductInfoStatus(data.status);
      } catch (err) {}
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

  if (productInfoStatus === 'active' || overRideSubscriptionCheck)
    return <div className="pb-[120px]">{children}</div>;

  if (productInfoStatus === 'loading') return null;

  return (
    <div
      id="id-subscribe"
      className="bg-bg-dark-elevated-primary md:py-14 py-8 md:px-20 px-10"
    >
      <div className="flex flex-col md:gap-10 gap-6 md:w-[439px] mx-auto">
        <div className="flex flex-col md:gap-4 items-center justify-center text-center">
          <p className="md:text-heading6 text-body1 text-label-dark-primary">
            {productInfoStatus === 'ended'
              ? 'Update subscription to keep reading'
              : 'Subscribe to keep reading our research'}
          </p>
          <p className="md:text-body2 text-small text-label-dark-primary">
            {productInfoStatus === 'ended'
              ? 'Your subscription to K33 Research Pro gets you full access to all our research.'
              : 'Subscribe to K33 Research Pro to keep reading and get full access to all our research.'}
          </p>
        </div>
        {productInfoStatus === 'blocked' && (
          <BasicButton variant="secondary" onClick={customerDashboard}>
            Update Subscription
          </BasicButton>
        )}

        {productInfoStatus === 'ended' ? (
          <BasicButton variant="secondary" onClick={doCheckOut}>
            Update Subscription
          </BasicButton>
        ) : (
          <BasicButton variant="secondary" onClick={doCheckOut}>
            Subscribe
          </BasicButton>
        )}
      </div>
    </div>
  );
};

export default SubscriptionAdvert;
