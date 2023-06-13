import * as React from 'react';
import { Layout } from 'antd';
import { NextPageWithLayout } from 'ui';
import { NextSeo } from 'next-seo';
import { TabLayout, Payments } from '@/components';
import { GetStaticProps } from 'next';
import { SubscriptionProduct } from '@/types';
import { getProducts } from '@/api';

const { Content } = Layout;

interface SettingsProps {
  product: SubscriptionProduct;
}

// TODO: get products
const Settings: NextPageWithLayout<SettingsProps> = ({ product }) => {
  return (
    <>
      <NextSeo title="K33 - Settings" />
      <Payments
        priceId={product.pricesCollection.items[0].stripeProductId}
        productId={product.productId}
      />
    </>
  );
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="payments"
      title="Settings"
      tabs={[{ key: 'payments', label: 'Payments', url: '' }]}
    >
      {page}
    </TabLayout>
  );
};

// TODO: error fallback
export const getStaticProps: GetStaticProps<SettingsProps> = async () => {
  const product = await getProducts();
  return {
    props: {
      product,
    },
  };
};

export default Settings;
