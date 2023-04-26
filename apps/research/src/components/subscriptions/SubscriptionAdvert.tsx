import config from '@/firebase/config';
import {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
  useLazyGetProductsQuery,
} from '@/services';
import { ProductStatus } from '@/types';
import { useAppState } from 'platform-js';
import * as React from 'react';
import { BasicButton } from 'ui';

interface SubscriptionAdvertProps {
  productId: string;
  overRideSubscriptionCheck?: boolean;
  children: React.ReactNode;
}

const SubscriptionAdvert: React.FC<SubscriptionAdvertProps> = ({
  productId,
  children,
  overRideSubscriptionCheck = false,
}) => {
  const [checkout] = useCheckoutMutation();
  const [productInfoStatus, setProductInfoStatus] = React.useState<
    ProductStatus | null | 'loading'
  >('loading');

  const state = useAppState(config);
  const [getProductsTrigger] = useLazyGetProductsQuery();
  const [getProductsInfoTrigger] = useLazyGetProductInfoQuery();

  const [dashboard] = useCustomerMutation();

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

  React.useEffect(() => {
    const getProductStatus = async (productId: string) => {
      try {
        const data = await getProductsInfoTrigger(productId).unwrap();
        setProductInfoStatus(data.status);
      } catch (err) {
        setProductInfoStatus(null);
      }
    };
    const getProducts = async () => {
      try {
        const data = await getProductsTrigger().unwrap();
        getProductStatus(data.subscribedProducts[0]);
      } catch (err) {
        setProductInfoStatus(null);
      }
    };
    getProducts();
  }, [state, getProductsTrigger, getProductsInfoTrigger]);

  const doCheckOut = async () => {
    try {
      const response = await checkout({
        price_id: productId,
        success_url: window.location.href,
        cancel_url: window.location.href,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {
      //nothing for now
    }
  };

  if (productInfoStatus === 'active' || overRideSubscriptionCheck)
    return <div className="pb-[120px]">{children}</div>;

  if (productInfoStatus === 'loading') return null;

  return (
    <div
      id="id-subscribe"
      className="bg-bg-dark-elevated-primary items-center justify-center text-center content-center md:py-14 py-8 md:px-20 px-10"
    >
      <div className="flex flex-col md:gap-10 gap-6">
        <div className="flex flex-col md:gap-4">
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
        {productInfoStatus === 'ended' ? (
          <BasicButton variant="secondary" onClick={customerDashboard}>
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
