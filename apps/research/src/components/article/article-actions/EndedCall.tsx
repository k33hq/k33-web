import * as React from 'react';
import CallToActionCard from './CallToActionCard';
import { Space, Typography, theme } from 'antd';
import { ProCheckoutCard } from '../article-payments';
import { appStructure } from '@/config';

interface EndedCallProps {
  checkout: () => void;
  yearlyCheckout: () => void;
  isLoading?: boolean;
  isReport?: boolean;
}

const { Text, Title } = Typography;
const { useToken } = theme;

const EndedCall: React.FC<EndedCallProps> = ({
  checkout,
  yearlyCheckout,
  isLoading = false,
  isReport = false,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  return (
    <CallToActionCard>
      <Space size={16}>
        <Space id="ended-header" direction="vertical" size={8}>
          <Title level={5} style={{ margin: 0 }}>
            {isReport
              ? 'Renew your K33 Research Pro subscription to download the report'
              : 'Renew your K33 Research Pro subscription to keep reading the article'}
          </Title>
        </Space>
        <ProCheckoutCard
          isEx={true}
          handleYearlyCheckout={yearlyCheckout}
          isLoading={isLoading}
          handleCheckout={checkout}
          label="Renew Your Subscription"
        />
      </Space>
    </CallToActionCard>
  );
};

export default EndedCall;
