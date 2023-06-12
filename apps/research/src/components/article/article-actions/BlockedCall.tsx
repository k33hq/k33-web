import { Result, Button } from 'antd';
import * as React from 'react';
import CallToActionCard from './CallToActionCard';
import { useCustomerMutation } from '@/services';
import { useCustomerDashboard } from '@/hooks';

const BlockedCall: React.FC = () => {
  const customerDashboard = useCustomerDashboard();
  return (
    <CallToActionCard>
      <Result
        style={{
          maxWidth: 656,
          padding: 0,
        }}
        status="error"
        title="Failed Payment Attempt"
        subTitle="We were unable to complete the payment attempt on your subscription as a K33 Research Pro user."
        extra={[
          <Button
            type="primary"
            key="update-payment-detail"
            onClick={customerDashboard}
          >
            Update Payment Details
          </Button>,
        ]}
      />
    </CallToActionCard>
  );
};

export default BlockedCall;
