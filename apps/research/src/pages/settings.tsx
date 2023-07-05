import * as React from 'react';
import { Layout } from 'antd';
import { NextPageWithLayout } from 'platform-js';
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
      description="Here you will find a nice description of the page that will help you 
    understand a bit better."
      activeKey="payments"
      title="Settings"
      tabs={[{ key: 'payments', label: 'Payments', url: '/settings' }]}
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
