import config from '@/firebase/config';
import {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
} from '@/services';
import { ProductStatus } from '@/types';
import { useAppState } from 'platform-js';
import * as React from 'react';
import { useHistoryTravel } from 'ahooks';
import { isBrowser } from '@/utils';

export const useCustomerDashboard = () => {
  const [dashboard, { data, isLoading }] = useCustomerMutation();
  const customerDashboard = async () => {
    try {
      const response = await dashboard({
        returnUrl: window.location.href,
      }).unwrap();

      let a = document.createElement('a');
      document.body.appendChild(a);
      //@ts-ignore
      a.style = 'display: none';
      a.href = response.url;
      a.click();
      document.body.removeChild(a);
    } catch (err) {}
  };

  return { customerDashboard, isLoading };
};

export const useCustomerCheckout = (priceId: string) => {
  const [checkout, { isLoading }] = useCheckoutMutation();
  const doCheckOut = async () => {
    try {
      const response = await checkout({
        priceId: priceId,
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {}
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

export const useTraverse = <T>(elements: Array<T>) => {
  const upperBound = elements.length - 1;
  const [current, setCurrent] = React.useState(upperBound ?? 0);
  const [list] = React.useState(elements);

  const previous = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };
  const next = () => {
    if (current < upperBound) {
      setCurrent((c) => c + 1);
    }
  };

  return {
    current: list[current],
    previous,
    next,
    hasNext: current < upperBound,
    hasPrevious: current > 0,
  };
};

export const useBrowser = () => {
  const [state, setState] = React.useState<boolean>(false);

  React.useEffect(() => {
    setState(isBrowser() && !!document.visibilityState);
  }, []);

  return state;
};
