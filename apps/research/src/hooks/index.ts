import config from '@/firebase/config';
import {
  useCheckoutMutation,
  useCustomerMutation,
  useDeleteSupressionGroupMutation,
  useLazyGetProductInfoQuery,
  usePutSupressionGroupMutation,
} from '@/services';
import { Plan, ProductStatus } from '@/types';
import { useAppState } from 'platform-js';
import * as React from 'react';
import { isBrowser } from '@/utils';
import { useRouter } from 'next/router';
import { appStructure } from '@/config';

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
  const router = useRouter();

  const getRedirectUrl = () => {
    switch (priceId) {
      case appStructure.payments.pro.annualPriceId:
      case appStructure.payments.pro.monthlyPriceId:
        return `${
          router.query.redirectUrl ?? window.location.href
        }?product=pro`;

      case appStructure.payments.aoc.annualPriceId:
      case appStructure.payments.aoc.monthlyPriceId:
        return `${
          router.query.redirectUrl ?? window.location.href
        }?product=aoc`;
      case appStructure.payments.twic.annualPriceId:
      case appStructure.payments.twic.monthlyPriceId:
        return `${
          router.query.redirectUrl ?? window.location.href
        }?product=twic`;
      case appStructure.payments.nn.annualPriceId:
      case appStructure.payments.nn.monthlyPriceId:
        return `${router.query.redirectUrl ?? window.location.href}?product=nn`;
      default:
        router.query.redirectUrl ?? window.location.href;
    }
  };

  const doCheckOut = async () => {
    try {
      const response = await checkout({
        priceId: priceId,
        successUrl: getRedirectUrl() + '&checkout=success',
        cancelUrl: (router.query.redirectUrl as string) ?? window.location.href,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {}
  };

  return { doCheckOut, isLoading };
};

export const useSupressionGroupActions = (groupId: string) => {
  const [putSupressionGroup, { isLoading }] = usePutSupressionGroupMutation();
  const [deleteSupressionGroup, { isLoading: deleteLoading }] =
    useDeleteSupressionGroupMutation();

  const putGroupInSupression = async () => {
    try {
      const response = await putSupressionGroup({ groupId }).unwrap();
    } catch (err) {}
  };

  const deleteGroupInSupression = async () => {
    try {
      const response = await deleteSupressionGroup({ groupId }).unwrap();
    } catch (err) {}
  };

  return {
    putGroupInSupression,
    deleteGroupInSupression,
    isLoading: isLoading || deleteLoading,
  };
};

export const useProductInfo = (productId: string) => {
  const state = useAppState(config);
  const [getProductsInfoTrigger] = useLazyGetProductInfoQuery();
  const [productInfoStatus, setProductInfoStatus] = React.useState<{
    state: ProductStatus | null | 'loading';
    priceId: null | string;
  }>({
    state: 'loading',
    priceId: null,
  });

  React.useEffect(() => {
    const getProductsInfo = async () => {
      try {
        const data = await getProductsInfoTrigger(productId).unwrap();
        setProductInfoStatus({
          state: data.status,
          priceId: data.priceId,
        });
      } catch (err) {
        setProductInfoStatus({ state: null, priceId: null });
      }
    };
    getProductsInfo();
  }, [state, getProductsInfoTrigger, productId]);

  return { productStatus: productInfoStatus, appState: state };
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

export const usePlan = (initialPlan: Plan = 'monthly') => {
  const [plan, setPlan] = React.useState<Plan>(initialPlan);
  return { plan, setPlan };
};
