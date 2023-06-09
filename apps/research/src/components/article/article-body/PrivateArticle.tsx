import { Article } from '@/types';
import * as React from 'react';
import { Skeleton } from 'antd';
import { useCheckoutMutation, useLazyGetProductInfoQuery } from '@/services';
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
  // checkout and dashboard mutations
  const [checkout] = useCheckoutMutation();
  const [getProductsInfoTrigger] = useLazyGetProductInfoQuery();

  // load the firebase app
  const state = useAppState(config);

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

  const doCheckOut = async () => {
    try {
      const response = await checkout({
        price_id: priceId,
        success_url: window.location.href,
        cancel_url: window.location.href,
      }).unwrap();
      window.location.href = response.url;
    } catch (err) {
      //nothing for now
    }
  };

  const getCallToAction = (state: typeof productInfoStatus) => {
    switch (state) {
      case 'loading':
        return (
          <>
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Input active size="default" block />
            <Skeleton.Image active />
            <Skeleton.Input active size="default" block />
          </>
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

  if (productInfoStatus === 'active') return children;

  return (
    <ActionLayout publicSnippet={publicSnippet}>
      {getCallToAction(productInfoStatus)}
    </ActionLayout>
  );
};

export default PrivateArticle;
