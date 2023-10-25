import * as React from 'react';
import CallToActionCard from './CallToActionCard';
import { Space, Typography, theme } from 'antd';
import { ProCheckoutCard } from '../article-payments';
import styles from './styles.module.scss';
import { ProductPlans } from '@/types';
import { useRouter } from 'next/router';
import { appStructure } from '@/config';

interface EndedCallProps {
  checkout: () => void;
  yearlyCheckout: () => void;
  isLoading?: boolean;
  isReport?: boolean;
  productKeys: ProductPlans;
  isLoggedOut?: boolean;
}

const { Text, Title } = Typography;
const { useToken } = theme;

const StartTrialCall: React.FC<EndedCallProps> = ({
  checkout,
  yearlyCheckout,

  productKeys,
  isLoading = false,
  isReport = false,
  isLoggedOut = false,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  const router = useRouter();

  // TODO: pass appropriate yearly or monthly checkout depending on productKeys.

  const signIn = () => {
    router.push('/pricing');
  };

  return (
    <CallToActionCard>
      <div style={{ gap: 16, width: '100%' }}>
        <Space id="ended-header" direction="vertical" size={8}>
          <Title level={5} style={{ margin: 0 }}>
            {isReport
              ? `Subscribe to ${appStructure.payments[productKeys].name} to download this report`
              : `Subscribe to ${appStructure.payments[productKeys].name} to keep reading this article`}
          </Title>
          {/* <Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            Subscribe and get full access to all research. No credit card needed
            for free trial.
          </Text> */}
        </Space>
        <ProCheckoutCard
          handleYearlyCheckout={isLoggedOut ? signIn : yearlyCheckout}
          isLoading={isLoading}
          handleCheckout={isLoggedOut ? signIn : checkout}
          label="Start 30-Day Free Trial"
          isFreeTrial
          features={appStructure.payments[productKeys].features}
          yearlyPrice={appStructure.payments[productKeys].yearlyPrice}
          monthlyPrice={appStructure.payments[productKeys].monthlyPrice}
          name={appStructure.payments[productKeys].name}
        />
        {/* <Space>
          <Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            No charge until the trial is complete. Cancel anytime.
          </Text>
        </Space> */}
      </div>
    </CallToActionCard>
  );
};

export default StartTrialCall;
