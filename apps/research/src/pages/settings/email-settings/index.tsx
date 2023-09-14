import * as React from 'react';
import { Skeleton, Typography, theme, Modal } from 'antd';
import { NextPageWithLayout } from 'platform-js';

import { EmailSetting, PrivateLayout, ProCheckoutCard } from '@/components';
import { useGetSupressionGroupsQuery } from '@/services';
import { appStructure } from '@/config';
import {
  useCustomerCheckout,
  useCustomerDashboard,
  useProductInfo,
} from '@/hooks';

// TODO: show dialog box when productStatus is ex user and not active
// TODO: update subscription group by using the toggle
// TODO: check if user is active or blocked before switching email newsletter and show dialog accordingly.
const EmailSettings: NextPageWithLayout = () => {
  const { data, isLoading } = useGetSupressionGroupsQuery();
  const { productStatus } = useProductInfo(appStructure.payments.productId);
  const { doCheckOut, isLoading: isCheckOutLoading } = useCustomerCheckout(
    appStructure.payments.monthlyPriceId
  );

  const { customerDashboard, isLoading: dashboardLoading } =
    useCustomerDashboard();

  const { doCheckOut: doYearlyCheckOut, isLoading: isYearlyLoading } =
    useCustomerCheckout(appStructure.payments.annualPriceId);

  const [showModal, setShowModal] = React.useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = () => {
    if (productStatus.state === 'blocked') {
      customerDashboard();
    } else {
      setShowModal(true);
    }
  };

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
      {Object.keys(appStructure.notifications)
        .sort((a, b) => {
          const idA = Number(a);
          const idB = Number(b);
          if (idA > idB) return -1;
          else if (idA === idB) return 0;
          else return 1;
        })
        .map((idKey) => {
          const notificationId = Number(idKey);
          const group = data.find((group) => group.id === notificationId);

          return (
            <EmailSetting
              openProductModal={handleOpenModal}
              id={group?.id!}
              suppressed={group?.suppressed!}
              name={group?.name!}
              isPro={appStructure.notifications[notificationId].isPro}
              productStatus={productStatus.state}
              description={
                appStructure.notifications[notificationId].description!
              }
            />
          );
        })}

      <Modal
        title="Register to K33 Research Pro"
        open={showModal}
        onCancel={handleCloseModal}
      >
        <ProCheckoutCard
          handleYearlyCheckout={doYearlyCheckOut}
          isLoading={isLoading || isYearlyLoading}
          handleCheckout={doCheckOut}
          label="Start 30-Day Free Trial"
          isFreeTrial
        />
      </Modal>
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
