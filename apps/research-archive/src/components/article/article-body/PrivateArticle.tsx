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

interface PrivateArticleProps
  extends React.PropsWithChildren,
    Pick<Article, 'publicSnippet'> {
  productId: string;
  priceId: string;
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
  productId,
  priceId,
  isReport = false,
}) => {
  const { doCheckOut, isLoading } = useCustomerCheckout(priceId);
  const [status, state] = useProductInfo(productId);
  const getCallToAction = (state: typeof status) => {
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
            isLoading={isLoading}
            checkout={doCheckOut}
            isReport={isReport}
          />
        );
      default:
        return (
          <StartTrialCall
            isLoading={isLoading}
            checkout={doCheckOut}
            isReport={isReport}
          />
        );
    }
  };

  if (state === 'SIGNED_OUT')
    return (
      <ActionLayout publicSnippet={publicSnippet}>
        <SignUpCall isReport={isReport} />
      </ActionLayout>
    );

  if (status === 'active') return children;

  return (
    <motion.div
      key={status}
      variants={variants}
      animate={'show'}
      initial="hide"
      style={{
        width: '100%',
      }}
    >
      <ActionLayout publicSnippet={publicSnippet}>
        {getCallToAction(status)}
      </ActionLayout>
    </motion.div>
  );
};

export default PrivateArticle;
