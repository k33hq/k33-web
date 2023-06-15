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

const { Text, Link } = Typography;
const { Ribbon } = Badge;

interface PaymentsProps {
  productId: string;
  priceId: string;
}

const mask = (email: string) =>
  email.replace(
    /^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, '*') + c
  );
const Payments: React.FC<PaymentsProps> = ({ productId, priceId }) => {
  const router = useRouter();
  const [status, state] = useProductInfo(productId);
  const checkout = useCustomerCheckout(priceId);
  const dashboard = useCustomerDashboard();

  React.useEffect(() => {
    getUserInformation((user) => {
      if (user) {
        setEmail(user.email);
      }
    });
  }, []);

  const getPaymentCard = (productStatus: typeof status) => {
    switch (productStatus) {
      case 'blocked':
        return (
          <Ribbon text={'Pro'} color={'red'}>
            <Card
              loading={status === 'loading'}
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
                  <Button onClick={dashboard} icon={<EditOutlined />}>
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
              loading={status === 'loading'}
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
                  <Button onClick={dashboard} icon={<EditOutlined />}>
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
            loading={status === 'loading'}
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
                <Button onClick={checkout}>Renew PRO Subscription</Button>
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
            loading={status === 'loading'}
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
                <Button onClick={checkout}>Start 30-Day Free Trial</Button>
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
      {state === 'SIGNED_OUT' ? (
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
          {status === 'blocked' && (
            <Alert
              message="Failed Payment Attempt:"
              description="We were unable to complete the payment of your subscription."
              type="error"
              showIcon
            />
          )}
          {getPaymentCard(status)}
        </>
      )}
    </>
  );
};

export default Payments;
