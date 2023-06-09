import { Result, Button } from 'antd';
import * as React from 'react';
import CallToActionCard from './CallToActionCard';
import { useCustomerMutation } from '@/services';

const BlockedCall: React.FC = () => {
  const [dashboard] = useCustomerMutation();

  const customerDashboard = async () => {
    try {
      const response = await dashboard({
        return_url: window.location.href,
      }).unwrap();

      let a = document.createElement('a');
      document.body.appendChild(a);
      //@ts-ignore
      a.style = 'display: none';
      a.href = response.url;
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CallToActionCard>
      <Result
        style={{
          maxWidth: 656,
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
