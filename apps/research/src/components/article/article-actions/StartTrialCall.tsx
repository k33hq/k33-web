import * as React from 'react';
import CallToActionCard from './CallToActionCard';
import { Space, Typography, theme } from 'antd';
import { ProCheckoutCard } from '../article-payments';

interface EndedCallProps {
  checkout: () => void;
}

const { Text, Title } = Typography;
const { useToken } = theme;

const StartTrialCall: React.FC<EndedCallProps> = ({ checkout }) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  return (
    <CallToActionCard>
      <Space size={16}>
        <Space id="ended-header" direction="vertical" size={8}>
          <Title level={5} style={{ margin: 0 }}>
            Register to K33 Research Pro
          </Title>
          <Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            Subscribe and get full access to all research. No credit card needed
            for free trial.
          </Text>
        </Space>
        <ProCheckoutCard
          handleCheckout={checkout}
          label="Start 30-Day Free Trial"
          isFreeTrial
        />
        <Space>
          <Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            No charge until the trial is complete. Cancel anytime.
          </Text>
        </Space>
      </Space>
    </CallToActionCard>
  );
};

export default StartTrialCall;
