import { Article } from '@/types';
import * as React from 'react';
import { Skeleton } from 'antd';
import { useLazyGetProductInfoQuery } from '@/services';
import { ProductStatus } from '@/types';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import {
  ActionLayout,
  SignUpCall,
  BlockedCall,
  EndedCall,
  StartTrialCall,
} from '../article-actions';
import { useCustomerCheckout, useProductInfo } from '@/hooks';

interface PrivateArticleProps
  extends React.PropsWithChildren,
    Pick<Article, 'publicSnippet'> {
  productId: string;
  priceId: string;
}

const PrivateArticle: React.FC<PrivateArticleProps> = ({
  publicSnippet,
  children,
  productId,
  priceId,
}) => {
  const doCheckOut = useCustomerCheckout(priceId);
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
            <Skeleton.Image active />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
          </div>
        );
      case 'blocked':
        return <BlockedCall />;
      case 'ended':
        return <EndedCall checkout={doCheckOut} />;
      default:
        return <StartTrialCall checkout={doCheckOut} />;
    }
  };

  if (state === 'SIGNED_OUT')
    return (
      <ActionLayout publicSnippet={publicSnippet}>
        <SignUpCall />
      </ActionLayout>
    );

  if (status === 'active') return children;

  return (
    <ActionLayout publicSnippet={publicSnippet}>
      {getCallToAction(status)}
    </ActionLayout>
  );
};

export default PrivateArticle;
