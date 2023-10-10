import { Article } from '@/types';
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

interface PrivateArticleProps
  extends React.PropsWithChildren,
    Pick<Article, 'publicSnippet'> {
  isReport?: boolean;
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
  isReport = false,
}) => {
  const { doCheckOut, isLoading } = useCustomerCheckout(
    appStructure.payments.pro.monthlyPriceId
  );

  const { doCheckOut: doYearlyCheckOut, isLoading: isYearlyLoading } =
    useCustomerCheckout(appStructure.payments.pro.annualPriceId);

  const { productStatus, appState } = useProductInfo(
    appStructure.payments.pro.productId
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
            yearlyCheckout={doYearlyCheckOut}
            isLoading={isLoading || isYearlyLoading}
            checkout={doCheckOut}
            isReport={isReport}
          />
        );
    }
  };

  if (appState === 'SIGNED_OUT')
    return (
      <ActionLayout publicSnippet={publicSnippet}>
        <SignUpCall
          title={
            isReport
              ? 'Try K33 Research Pro for free to download the report'
              : 'Try K33 Research Pro for free to read the article'
          }
        />
      </ActionLayout>
    );

  if (productStatus.state === 'active') return children;

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
