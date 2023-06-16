import * as React from 'react';
import CallToActionCard from './CallToActionCard';
import { Space, Typography, theme } from 'antd';
import { ProCheckoutCard } from '../article-payments';

interface EndedCallProps {
  checkout: () => void;
  isLoading?: boolean;
}

const { Text, Title } = Typography;
const { useToken } = theme;

const EndedCall: React.FC<EndedCallProps> = ({
  checkout,
  isLoading = false,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  return (
    <CallToActionCard>
      <Space size={16}>
        <Space id="ended-header" direction="vertical" size={8}>
          <Title level={5} style={{ margin: 0 }}>
            Renew your K33 Research Pro subscription
          </Title>
          <Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            Subscribe again and regain full access to all research.
          </Text>
        </Space>
        <ProCheckoutCard
          isLoading={isLoading}
          handleCheckout={checkout}
          label="Renew Your Subscription"
        />
      </Space>
    </CallToActionCard>
  );
};

export default EndedCall;
