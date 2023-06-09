import { Article } from '@/types';
import * as React from 'react';
import { Skeleton } from 'antd';
import {
  useCheckoutMutation,
  useCustomerMutation,
  useLazyGetProductInfoQuery,
} from '@/services';
import { ProductStatus } from '@/types';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import {
  ActionLayout,
  SignUpCall,
  BlockedCall,
  EndedCall,
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

  return (
    <ActionLayout publicSnippet={publicSnippet}>
      <EndedCall checkout={doCheckOut} />
    </ActionLayout>
  );

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

  switch (productInfoStatus) {
    case 'active':
      return children;
    case 'blocked':
      return (
        <ActionLayout publicSnippet={publicSnippet}>
          <BlockedCall />
        </ActionLayout>
      );
    case 'ended':
      return <h1>ended</h1>;

    default:
      return <h1>trail</h1>;
  }
};

export default PrivateArticle;
