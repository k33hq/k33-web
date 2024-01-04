import * as React from 'react';
import { Skeleton, Typography, theme, Modal, Button, Divider } from 'antd';
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
  const { productStatus } = useProductInfo(appStructure.payments.pro.productId);
  const { doCheckOut, isLoading: isCheckOutLoading } = useCustomerCheckout(
    appStructure.payments.pro.monthlyPriceId
  );

  const { customerDashboard, isLoading: dashboardLoading } =
    useCustomerDashboard();

  const { doCheckOut: doYearlyCheckOut, isLoading: isYearlyLoading } =
    useCustomerCheckout(appStructure.payments.pro.annualPriceId);

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
          gap: 16,
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
        <Typography.Title level={4}>Newsletters Access</Typography.Title>
        <Typography.Text
          type="secondary"
          style={{
            fontSize: fontSizeSM,
          }}
        >
          {productStatus.state === 'active'
            ? 'The Pro package includes three weekly newsletters delivered directly to your inbox. Manage which newsletters you want to receive below.'
            : ''}
        </Typography.Text>
      </div>
      <Divider style={{ margin: 0 }} />
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
              isPro={productStatus.state === 'active'}
              productStatus={productStatus.state}
              productPlan={appStructure.notifications[notificationId].plan!}
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
        footer={null}
      >
        <ProCheckoutCard
          handleYearlyCheckout={doYearlyCheckOut}
          isLoading={isLoading || isYearlyLoading}
          handleCheckout={doCheckOut}
          label="Start 30-Day Free Trial"
          isFreeTrial
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button type="text" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

EmailSettings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateLayout
      seoTitle='"K33 - Settings | Emails"'
      activeKey="/settings/newsletters"
      title="Settings"
      type="secondary"
      tabs={[
        { key: 'payments', label: 'Subscriptions', url: '/settings' },
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

export default EmailSettings;
