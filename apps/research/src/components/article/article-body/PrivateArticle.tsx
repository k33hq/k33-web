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
        return <EndedCall isLoading={isLoading} checkout={doCheckOut} />;
      default:
        return <StartTrialCall isLoading={isLoading} checkout={doCheckOut} />;
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
