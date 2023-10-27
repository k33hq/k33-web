import { Article, ISectionFields, ProductPlans } from '@/types';
import * as React from 'react';
import { Skeleton } from 'antd';
import {
  ActionLayout,
  SignUpCall,
  BlockedCall,
  EndedCall,
  StartTrialCall,
} from '../article-actions';
import { useCustomerCheckout, useProductInfo } from '@/hooks';
import { motion } from 'framer-motion';
import { appStructure } from '@/config';
import { getProductSection, sectionKeys } from '@/utils';

interface PrivateArticleProps
  extends React.PropsWithChildren,
    Pick<Article, 'publicSnippet'> {
  isReport?: boolean;
  sections: {
    items: ISectionFields[];
  };
}

export const variants = {
  show: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
  hide: {
    opacity: 0,
  },
};

const PrivateArticle: React.FC<PrivateArticleProps> = ({
  publicSnippet,
  children,
  sections,
  isReport = false,
}) => {
  const productSection = getProductSection(sections);

  const productKey = sectionKeys[productSection?.name!] ?? 'pro';

  // TODO: get ahead of the curve checkout
  // TODO: get twic checkout
  // TODO: get nn checkout

  const { doCheckOut, isLoading } = useCustomerCheckout(
    appStructure.payments[productKey].monthlyPriceId
  );

  const { doCheckOut: doYearlyCheckOut, isLoading: isYearlyLoading } =
    useCustomerCheckout(appStructure.payments[productKey].annualPriceId);

  const { productStatus, appState } = useProductInfo(
    appStructure.payments[productKey].productId
  );

  const getCallToAction = (state: typeof productStatus.state) => {
    switch (state) {
      case 'loading':
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
            }}
          >
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Image
              style={{
                width: '100%',
                height: 400,
              }}
              active
            />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
          </div>
        );
      case 'blocked':
        return <BlockedCall />;
      case 'ended':
        return (
          <EndedCall
            yearlyCheckout={doYearlyCheckOut}
            isLoading={isLoading}
            checkout={doCheckOut}
            isReport={isReport}
          />
        );
      default:
        return (
          <StartTrialCall
            productKeys={productKey}
            yearlyCheckout={doYearlyCheckOut}
            isLoading={isLoading || isYearlyLoading}
            checkout={doCheckOut}
            isLoggedOut={
              appState === 'SIGNED_OUT' || appState === 'UNREGISTRED'
            }
            isReport={isReport}
          />
        );
    }
  };

  if (productStatus.state === 'active' || productKey === 'pro') return children;

  if (appState === 'SIGNED_OUT')
    return (
      <ActionLayout publicSnippet={publicSnippet}>
        <StartTrialCall
          productKeys={productKey}
          yearlyCheckout={doYearlyCheckOut}
          isLoading={isLoading || isYearlyLoading}
          checkout={doCheckOut}
          isReport={isReport}
          isLoggedOut={appState === 'SIGNED_OUT' || appState === 'UNREGISTRED'}
        />
      </ActionLayout>
    );

  return (
    <motion.div
      key={productStatus.state}
      variants={variants}
      animate={'show'}
      initial="hide"
      style={{
        width: '100%',
      }}
    >
      <ActionLayout publicSnippet={publicSnippet}>
        {getCallToAction(productStatus.state)}
      </ActionLayout>
    </motion.div>
  );
};

export default PrivateArticle;
