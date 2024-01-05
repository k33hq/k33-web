import * as React from 'react';
import { Layout, Typography } from 'antd';
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
      type="secondary"
      tabs={[
        { key: 'payments', label: 'Subscriptions', url: '/settings' },
        {
          key: 'newsletters',
          label: 'Email Settings',
          url: '/settings/newsletters',
        },
      ]}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <Typography.Text type="secondary">
          Here you can have an overview of you current plan and your payment
          methods.
        </Typography.Text>
      </div>

      {page}
    </PrivateLayout>
  );
};

export default Settings;
