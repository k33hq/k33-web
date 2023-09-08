import * as React from 'react';
import { Divider, Layout, Skeleton, Switch, Typography, theme } from 'antd';
import { NextPageWithLayout } from 'platform-js';
import { NextSeo } from 'next-seo';
import { PrivateLayout } from '@/components';
import { SubscriptionProduct } from '@/types';
import { useGetSupressionGroupsQuery } from '@/services';
import { appStructure } from '@/config';
import { useProductInfo } from '@/hooks';

// TODO: get products
const EmailSettings: NextPageWithLayout = () => {
  const { data, isLoading } = useGetSupressionGroupsQuery();
  const { productStatus } = useProductInfo(appStructure.payments.productId);

  const {
    token: { fontSizeSM },
  } = theme.useToken();

  if (isLoading || data === undefined)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: '100%',
        }}
      >
        <Skeleton />
        <Skeleton />
      </div>
    );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
          alignItems: 'flex-start',
        }}
      >
        <Typography.Title level={5}>Newsletters</Typography.Title>
        <Typography.Text
          style={{
            fontSize: fontSizeSM,
          }}
        >
          Opt in or out for the newsletters you receive in your mailbox.
        </Typography.Text>
      </div>
      {Object.keys(appStructure.notifications).map((idKey) => {
        const notificationId = Number(idKey);
        const group = data.find((group) => group.id === notificationId);
        return (
          <>
            <div
              key={notificationId}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div>
                <Typography.Title level={5}>{group?.name}</Typography.Title>
                <Typography.Text
                  style={{
                    fontSize: fontSizeSM,
                  }}
                >
                  {appStructure.notifications[notificationId].description}
                </Typography.Text>
              </div>
              <Switch />
            </div>
            <Divider style={{ margin: 0 }} />
          </>
        );
      })}
    </div>
  );
};

EmailSettings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateLayout
      seoTitle='"K33 - Settings | Emails"'
      activeKey="/settings/email-settings"
      title="Settings"
      tabs={[
        { key: 'payments', label: 'Payments', url: '/settings' },
        {
          key: 'email-settings',
          label: 'Email Settings',
          url: '/settings/email-settings',
        },
      ]}
    >
      {page}
    </PrivateLayout>
  );
};

export default EmailSettings;
