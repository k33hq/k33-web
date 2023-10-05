import * as React from 'react';
import SettingsPaymentTitle from './SettingsPaymentTitle';
import PaymentCard from './PaymentCard';
import { Card, Avatar, Space, Typography, Button, Badge, Alert } from 'antd';
import {
  useCustomerCheckout,
  useCustomerDashboard,
  useProductInfo,
} from '@/hooks';
import { useRouter } from 'next/router';
import { WalletOutlined, EditOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import stripe from '../../../assets/stripe.svg';
import Image from 'next/image';
import { getUserInformation } from 'core';
import { SignUpCall } from '@/components';
import { appStructure } from '@/config';
import { ProductPlans } from '@/types';

const { Text, Link } = Typography;
const { Ribbon } = Badge;

const mask = (email: string) =>
  email.replace(
    /^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, '*') + c
  );
const Payments: React.FC = () => {
  const router = useRouter();

  // pro check out
  const { productStatus } = useProductInfo(appStructure.payments.pro.productId);
  const { doCheckOut: checkout, isLoading } = useCustomerCheckout(
    appStructure.payments.pro.monthlyPriceId
  );

  // navigating naratives
  const { productStatus: nnProductStatus } = useProductInfo(
    appStructure.payments.nn.productId
  );
  const { doCheckOut: nnMonthlyCheckout, isLoading: nnMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.nn.monthlyPriceId);

  // ahead of the curve
  const { productStatus: aocProductStatus } = useProductInfo(
    appStructure.payments.aoc.productId
  );
  const { doCheckOut: aocMonthlyCheckout, isLoading: aocMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.aoc.monthlyPriceId);

  // this week in crypto
  const { productStatus: twicProductStatus } = useProductInfo(
    appStructure.payments.twic.productId
  );
  const { doCheckOut: twicMonthlyCheckout, isLoading: twicMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.twic.monthlyPriceId);

  // customer dashboard
  const { customerDashboard: dashboard, isLoading: isDashboardLoading } =
    useCustomerDashboard();

  React.useEffect(() => {
    getUserInformation((user) => {
      if (user) {
        setEmail(user.email);
      }
    });
  }, []);

  const getPaymentCard = (plan: ProductPlans) => {
    let status: string | null = 'loading';

    if (plan === 'aoc') {
      status = aocProductStatus.state;
    }

    if (plan === 'nn') {
      status = nnProductStatus.state;
    }

    if (plan === 'twic') {
      status = twicProductStatus.state;
    }

    if (plan === 'pro') {
      status = productStatus.state;
    }

    switch (status) {
      case 'blocked':
        return (
          <Ribbon text={'Pro'} color={'red'}>
            <Card
              loading={productStatus.state === 'loading'}
              id="payments-card"
              style={{
                width: '100%',
              }}
            >
              <div className={styles.paymentCard}>
                <div
                  id="payment-information"
                  className={styles.paymentInformation}
                >
                  <Avatar icon={<WalletOutlined />} />
                  <Space.Compact direction="vertical">
                    <Text strong>K33 Research</Text>
                    {email && (
                      <Text type="secondary">{`Email: ${mask(email)}`}</Text>
                    )}
                  </Space.Compact>
                </div>

                <div id="payment-action" className={styles.paymentAction}>
                  <Button
                    loading={isDashboardLoading}
                    onClick={dashboard}
                    icon={<EditOutlined />}
                  >
                    Update Payment Details
                  </Button>
                  <Image
                    priority
                    width={73}
                    style={{
                      minWidth: 50,
                    }}
                    src={stripe}
                    alt="stripe"
                  />
                </div>
              </div>
            </Card>
          </Ribbon>
        );
      case 'active':
        return (
          <Ribbon text={'Pro'} color={'#000000'}>
            <Card
              loading={productStatus.state === 'loading'}
              id="payments-card"
              style={{
                width: '100%',
              }}
            >
              <div className={styles.paymentCard}>
                <div
                  id="payment-information"
                  className={styles.paymentInformation}
                >
                  <Avatar icon={<WalletOutlined />} />
                  <Space.Compact direction="vertical">
                    <Text strong>K33 Research</Text>
                    {email && (
                      <Text type="secondary">{`Email: ${mask(email)}`}</Text>
                    )}
                  </Space.Compact>
                </div>

                <div id="payment-action" className={styles.paymentAction}>
                  <Button
                    loading={isDashboardLoading}
                    onClick={dashboard}
                    icon={<EditOutlined />}
                  >
                    Manage Subscription
                  </Button>
                  <Image
                    priority
                    width={73}
                    style={{
                      minWidth: 50,
                    }}
                    src={stripe}
                    alt="stripe"
                  />
                </div>
              </div>
            </Card>
          </Ribbon>
        );
      case 'ended':
        return (
          <Card
            loading={productStatus.state === 'loading'}
            id="payments-card"
            style={{
              width: '100%',
            }}
          >
            <div className={styles.paymentCard}>
              <div
                id="payment-information"
                className={styles.paymentInformation}
              >
                <Avatar icon={<WalletOutlined />} />
                <Space.Compact direction="vertical">
                  <Text strong>K33 Research</Text>
                  {email && (
                    <Text type="secondary">{`Email: ${mask(email)}`}</Text>
                  )}
                </Space.Compact>
              </div>

              <div id="payment-action" className={styles.paymentAction}>
                <Button loading={isLoading} onClick={checkout}>
                  Renew PRO Subscription
                </Button>
                <Image
                  priority
                  width={73}
                  style={{
                    minWidth: 50,
                  }}
                  src={stripe}
                  alt="stripe"
                />
              </div>
            </div>
          </Card>
        );
      default:
        return (
          <Card
            loading={productStatus.state === 'loading'}
            style={{
              width: '100%',
            }}
            id="payments-card"
          >
            <div className={styles.paymentCard}>
              <div
                id="payment-information"
                className={styles.paymentInformation}
              >
                <Avatar icon={<WalletOutlined />} />
                <Space.Compact direction="vertical">
                  <Text strong>K33 Research</Text>
                  {email && (
                    <Text type="secondary">{`Email: ${mask(email)}`}</Text>
                  )}
                </Space.Compact>
              </div>

              <div id="payment-action" className={styles.paymentAction}>
                <Button loading={isLoading} onClick={checkout}>
                  Start 30-Day Free Trial
                </Button>
                <Image
                  priority
                  width={73}
                  style={{
                    minWidth: 50,
                  }}
                  src={stripe}
                  alt="stripe"
                />
              </div>
            </div>
          </Card>
        );
    }
  };

  const [email, setEmail] = React.useState<string | null>(null);

  return (
    <>
      {productStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your PRO Subscription."
          type="error"
          showIcon
        />
      )}

      {aocProductStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your Ahead of The Curve Subscription."
          type="error"
          showIcon
        />
      )}

      {nnProductStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your Navigating Narratives Subscription."
          type="error"
          showIcon
        />
      )}

      {twicProductStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your This Week in Crypto Subscription."
          type="error"
          showIcon
        />
      )}
      {Object.keys(appStructure.payments).map((plan) =>
        getPaymentCard(plan as ProductPlans)
      )}
    </>
  );
};

export default Payments;
