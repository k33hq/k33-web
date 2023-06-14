import * as React from 'react';
import SettingsPaymentTitle from './SettingsPaymentTitle';
import PaymentCard from './PaymentCard';
import { Card, Avatar, Space, Typography, Button, Badge } from 'antd';
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
          <Button onClick={checkout} icon={<EditOutlined />}>
            Update Payment Details
          </Button>
        );
      case 'active':
        return (
          <Button onClick={checkout} icon={<EditOutlined />}>
            Manage Subscription
          </Button>
        );
      case 'ended':
        return <Button onClick={checkout}>Renew PRO Subscription</Button>;
      default:
        return <Button onClick={checkout}>Start 30-Day Free Trial</Button>;
    }
  };

  const [email, setEmail] = React.useState<string | null>(null);

  return (
    <>
      <SettingsPaymentTitle />

      {state === 'SIGNED_OUT' ? (
        <Link
          href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
        >
          Login
        </Link>
      ) : (
        <Card
          loading={status === 'loading'}
          id="payments-card"
          style={{
            width: '100%',
          }}
        >
          <div className={styles.paymentCard}>
            <Ribbon
              // text={['blocked', 'active'].includes(status!) ? 'Pro' : null}
              text={'Pro'}
              color="red"
            >
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
            </Ribbon>
            <div id="payment-action" className={styles.paymentAction}>
              {getPaymentCard(status)}
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
      )}
    </>
  );
};

export default Payments;
