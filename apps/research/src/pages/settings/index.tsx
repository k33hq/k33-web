import * as React from 'react';
import { Layout } from 'antd';
import { NextPageWithLayout } from 'platform-js';
import { NextSeo } from 'next-seo';
import { Payments, PrivateLayout } from '@/components';
import { SubscriptionProduct } from '@/types';

const { Content } = Layout;

interface SettingsProps {
  product: SubscriptionProduct;
}

// TODO: get products
const Settings: NextPageWithLayout<SettingsProps> = ({ product }) => {
  return <Payments />;
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateLayout
      seoTitle='"K33 - Settings | Payments"'
      activeKey="/settings"
      title="Settings"
      tabs={[
        { key: 'payments', label: 'Payments', url: '/settings' },
        {
          key: 'newsletters',
          label: 'Newsletters',
          url: '/settings/newsletters',
        },
      ]}
    >
      {page}
    </PrivateLayout>
  );
};

export default Settings;
