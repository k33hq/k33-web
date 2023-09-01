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
      <Payments />
    </>
  );
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="payments"
      title="Settings"
      tabs={[{ key: 'payments', label: 'Payments', url: '/settings' }]}
    >
      {page}
    </TabLayout>
  );
};

export default Settings;
