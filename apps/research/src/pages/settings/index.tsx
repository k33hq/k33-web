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
      description="Here you will find a nice description of the page that will help you understand a bit better and use some of the space above."
      tabs={[
        { key: 'payments', label: 'Payments', url: '/settings' },
        {
          key: 'newsletters',
          label: 'Newsletters',
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
        <Typography.Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          Your payment methods
        </Typography.Title>
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
