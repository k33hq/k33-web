import config from '@/firebase/config';
import {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
} from '@/services';
import { ProductStatus } from '@/types';
import { useAppState } from 'platform-js';
import * as React from 'react';

export const useCustomerDashboard = () => {
  const [dashboard, { data, isLoading }] = useCustomerMutation();
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

  return { customerDashboard, isLoading };
};

export const useCustomerCheckout = (priceId: string) => {
  const [checkout, { isLoading }] = useCheckoutMutation();
  const doCheckOut = async () => {
    try {
      const response = await checkout({
        price_id: priceId,
        success_url: window.location.href,
        cancel_url: window.location.href,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {
      console.log(err);
    }
  };

  return { doCheckOut, isLoading };
};

export const useProductInfo = (productId: string) => {
  const state = useAppState(config);
  const [getProductsInfoTrigger] = useLazyGetProductInfoQuery();
  const [productInfoStatus, setProductInfoStatus] = React.useState<
    ProductStatus | null | 'loading'
  >('loading');

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

  return [productInfoStatus, state];
};
