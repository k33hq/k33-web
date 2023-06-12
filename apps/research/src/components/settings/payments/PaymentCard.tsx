import { Card, Avatar, Space, Typography, Button } from 'antd';
import * as React from 'react';
import { WalletOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import stripe from '../../../assets/stripe.svg';
import Image from 'next/image';

const { Text } = Typography;

interface PaymentCardProps {
  label: string;
  paymentHandler: () => void;
  loading?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  label,
  paymentHandler,
  loading = false,
}) => {
  const [email, setEmail] = React.useState('joedso1@gmail.com');
  return (
    <Card
      loading
      id="payments-card"
      style={{
        width: '100%',
      }}
    >
      <div className={styles.paymentCard}>
        <div id="payment-information" className={styles.paymentInformation}>
          <Avatar icon={<WalletOutlined />} />
          <Space.Compact direction="vertical">
            <Text strong>K33 Research</Text>
            <Text type="secondary">{`Email: ${email.replace(
              /^(.)(.*)(.@.*)$/,
              (_, a, b, c) => a + b.replace(/./g, '*') + c
            )}`}</Text>
          </Space.Compact>
        </div>
        <div id="payment-action" className={styles.paymentAction}>
          <Button onClick={paymentHandler}>{label}</Button>
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
};

export default PaymentCard;
