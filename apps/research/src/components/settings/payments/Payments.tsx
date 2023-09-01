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

const { Text, Link } = Typography;
const { Ribbon } = Badge;

const mask = (email: string) =>
  email.replace(
    /^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, '*') + c
  );
const Payments: React.FC = () => {
  const router = useRouter();
  const { productStatus, appState } = useProductInfo(
    appStructure.payments.productId
  );
  const { doCheckOut: checkout, isLoading } = useCustomerCheckout(
    appStructure.payments.monthlyPriceId
  );
  const { customerDashboard: dashboard, isLoading: isDashboardLoading } =
    useCustomerDashboard();

  React.useEffect(() => {
    getUserInformation((user) => {
      if (user) {
        setEmail(user.email);
      }
    });
  }, []);

  const getPaymentCard = (status: typeof productStatus.state) => {
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
      <SettingsPaymentTitle />
      {appState === 'SIGNED_OUT' ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SignUpCall />
        </div>
      ) : (
        <>
          {productStatus.state === 'blocked' && (
            <Alert
              message="Failed Payment Attempt:"
              description="We were unable to complete the payment of your subscription."
              type="error"
              showIcon
            />
          )}
          {getPaymentCard(productStatus.state)}
        </>
      )}
    </>
  );
};

export default Payments;
