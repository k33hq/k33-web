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
import { TopPromotion } from '@/components';

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
  const productSection = getProductSection(sections)?.name ?? '';

  const productKey = sectionKeys[productSection] ?? 'pro';

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

  const {
    productStatus: completePackageStatus,
    appState: completePackageAppState,
  } = useProductInfo(appStructure.payments.pro.productId);

  const { doCheckOut: doProyearlyCheckout, isLoading: isProYearlyLoading } =
    useCustomerCheckout(appStructure.payments.pro.annualPriceId);

  const { doCheckOut: doProMonthlyCheckout, isLoading: isProMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.pro.monthlyPriceId);

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
        if (completePackageStatus.state === 'ended') {
          return null;
        }
        return <BlockedCall />;
      case 'ended':
        if (completePackageStatus.state === 'ended') {
          return null;
        }
        return (
          <EndedCall
            yearlyCheckout={doYearlyCheckOut}
            isLoading={isLoading || isYearlyLoading}
            checkout={doCheckOut}
            isReport={isReport}
          />
        );
      default:
        if (completePackageStatus.state === 'ended') {
          return null;
        }
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

  if (
    productStatus.state === 'active' ||
    completePackageStatus.state === 'active' ||
    productKey === 'pro'
  )
    return children;

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
    <>
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
          {completePackageStatus.state === 'ended' && (
            <EndedCall
              yearlyCheckout={doProyearlyCheckout}
              isLoading={isProMonthlyLoading || isProYearlyLoading}
              checkout={doProMonthlyCheckout}
              isReport={isReport}
            />
          )}
          {getCallToAction(productStatus.state)}
        </ActionLayout>
      </motion.div>
    </>
  );
};

export default PrivateArticle;
