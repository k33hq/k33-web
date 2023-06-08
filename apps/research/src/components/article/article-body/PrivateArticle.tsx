import { Article } from '@/types';
import * as React from 'react';
import { Skeleton } from 'antd';
import { useCheckoutMutation, useCustomerMutation } from '@/services';
import { ProductStatus } from '@/types';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import { ActionLayout, SignUpCall } from '../article-actions';

interface PrivateArticleProps
  extends React.PropsWithChildren,
    Pick<Article, 'publicSnippet'> {}

const PrivateArticle: React.FC<PrivateArticleProps> = ({
  publicSnippet,
  children,
}) => {
  // checkout and dashboard mutations
  const [checkout] = useCheckoutMutation();
  const [dashboard] = useCustomerMutation();

  // load the firebase app
  const state = useAppState(config);

  const [productInfoStatus, setProductInfoStatus] = React.useState<
    ProductStatus | null | 'loading'
  >('loading');

  if (state === 'SIGNED_OUT')
    return (
      <ActionLayout publicSnippet={publicSnippet}>
        <SignUpCall />
      </ActionLayout>
    );

  if (productInfoStatus === 'loading')
    return (
      <ActionLayout publicSnippet={publicSnippet}>
        <Skeleton.Input active size="default" block />
        <Skeleton.Input active size="default" block />
        <Skeleton.Input active size="default" block />
        <Skeleton.Image active />
        <Skeleton.Input active size="default" block />
      </ActionLayout>
    );

  return <>{children}</>;
};

export default PrivateArticle;
