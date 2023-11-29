import * as React from 'react';
import SettingsPaymentTitle from './SettingsPaymentTitle';
// import PaymentCard from './PaymentCard';
import {
  Card,
  Avatar,
  Space,
  Typography,
  Button,
  Badge,
  Alert,
  Image as AntImage,
  Grid,
  Row,
  Col,
} from 'antd';
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
import { Payments as PaymentTypes, ProductPlans, ProductStatus } from '@/types';

const { Text, Link } = Typography;
const { Ribbon } = Badge;

const mask = (email: string) =>
  email.replace(
    /^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, '*') + c
  );
const Payments: React.FC = () => {
  const router = useRouter();
  const { sm, xl } = Grid.useBreakpoint();

  // pro check out
  const proProductInfo = useProductInfo(appStructure.payments.pro.productId);
  const proMonthlyCheckout = useCustomerCheckout(
    appStructure.payments.pro.monthlyPriceId
  );

  // navigating naratives
  const nnProductInfo = useProductInfo(appStructure.payments.nn.productId);
  const nnMonthlyCheckout = useCustomerCheckout(
    appStructure.payments.nn.monthlyPriceId
  );

  // ahead of the curve
  const aocProductInfo = useProductInfo(appStructure.payments.aoc.productId);
  const aocMonthlyCheckout = useCustomerCheckout(
    appStructure.payments.aoc.monthlyPriceId
  );

  // this week in crypto
  const twicProductInfo = useProductInfo(appStructure.payments.twic.productId);
  const twicMonthlyCheckout = useCustomerCheckout(
    appStructure.payments.twic.monthlyPriceId
  );

  // customer dashboard
  const customerDashboard = useCustomerDashboard();
  const [email, setEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    getUserInformation((user) => {
      if (user) {
        setEmail(user.email);
      }
    });
  }, []);

  const getPaymentCard = (plan: ProductPlans, payments: PaymentTypes) => {
    switch (plan) {
      case 'aoc':
        return (
          <PlanProduct
            email={email}
            isLoading={
              aocProductInfo.appState === 'LOADING' ||
              aocProductInfo.productStatus.state === 'loading'
            }
            productStatus={aocProductInfo.productStatus.state ?? 'loading'}
            dashboardProps={customerDashboard}
            checkoutProps={aocMonthlyCheckout}
            payment={appStructure.payments.aoc}
          />
        );
      case 'nn':
        return (
          <PlanProduct
            email={email}
            isLoading={
              nnProductInfo.appState === 'LOADING' ||
              nnProductInfo.productStatus.state === 'loading'
            }
            productStatus={nnProductInfo.productStatus.state ?? 'loading'}
            dashboardProps={customerDashboard}
            checkoutProps={nnMonthlyCheckout}
            payment={appStructure.payments.nn}
          />
        );
      case 'twic':
        return (
          <PlanProduct
            email={email}
            isLoading={
              twicProductInfo.appState === 'LOADING' ||
              twicProductInfo.productStatus.state === 'loading'
            }
            productStatus={twicProductInfo.productStatus.state ?? 'loading'}
            dashboardProps={customerDashboard}
            checkoutProps={twicMonthlyCheckout}
            payment={appStructure.payments.twic}
          />
        );
      case 'pro':
        return (
          <PlanProduct
            email={email}
            isLoading={
              proProductInfo.appState === 'LOADING' ||
              proProductInfo.productStatus.state === 'loading'
            }
            productStatus={proProductInfo.productStatus.state ?? 'loading'}
            dashboardProps={customerDashboard}
            checkoutProps={proMonthlyCheckout}
            payment={appStructure.payments.pro}
            isTrial
          />
        );
      default:
        return (
          <PlanProduct
            email={email}
            isLoading={
              proProductInfo.appState === 'LOADING' ||
              proProductInfo.productStatus.state === 'loading'
            }
            productStatus={proProductInfo.productStatus.state ?? 'loading'}
            dashboardProps={customerDashboard}
            checkoutProps={proMonthlyCheckout}
            payment={appStructure.payments.pro}
            isTrial
          />
        );
    }
  };

  return (
    <>
      {proProductInfo.productStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your PRO Subscription."
          type="error"
          showIcon
        />
      )}

      {aocProductInfo.productStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your Ahead of The Curve Subscription."
          type="error"
          showIcon
        />
      )}

      {nnProductInfo.productStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your Navigating Narratives Subscription."
          type="error"
          showIcon
        />
      )}

      {twicProductInfo.productStatus.state === 'blocked' && (
        <Alert
          message="Failed Payment Attempt:"
          description="We were unable to complete the payment of your This Week in Crypto Subscription."
          type="error"
          showIcon
        />
      )}

      <Row wrap gutter={[40, 40]}>
        {Object.keys(appStructure.payments).map((plan) => (
          <Col xs={24} sm={24} lg={12} key={plan}>
            {getPaymentCard(
              plan as ProductPlans,
              appStructure.payments[plan as ProductPlans]
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Payments;

interface PlanProductProps {
  email: string | null;
  productStatus: ProductStatus | 'loading';
  checkoutProps: {
    doCheckOut: () => Promise<void>;
    isLoading: boolean;
  };
  dashboardProps: {
    customerDashboard: () => Promise<void>;
    isLoading: boolean;
  };
  payment: PaymentTypes;
  isLoading: boolean;
  isTrial?: boolean;
}

const PlanProduct: React.FC<PlanProductProps> = ({
  productStatus,
  email,
  isLoading,
  checkoutProps: { doCheckOut, isLoading: checkoutLoading },
  dashboardProps: { customerDashboard, isLoading: isDashboardLoading },
  payment,
  isTrial = false,
}) => {
  const { sm, xl } = Grid.useBreakpoint();
  switch (productStatus) {
    case 'blocked':
      return (
        <Ribbon text={'Pro'} color={'red'}>
          <PaymentCard payments={payment} email={email} isLoading={isLoading}>
            <Button
              loading={isDashboardLoading}
              onClick={customerDashboard}
              icon={<EditOutlined />}
              style={{
                width: !xl ? '100%' : 'null',
              }}
            >
              Update Payment Details
            </Button>
          </PaymentCard>
        </Ribbon>
      );
    case 'active':
      return (
        <PaymentCard payments={payment} email={email} isLoading={isLoading}>
          <Button
            loading={isDashboardLoading}
            onClick={customerDashboard}
            style={{
              width: !xl ? '100%' : 'null',
            }}
            icon={<EditOutlined />}
          >
            Manage Subscription
          </Button>
        </PaymentCard>
      );
    case 'ended':
      return (
        <PaymentCard payments={payment} email={email} isLoading={isLoading}>
          <Button
            loading={checkoutLoading}
            onClick={doCheckOut}
            style={{
              width: !xl ? '100%' : 'null',
            }}
          >
            Renew Subscription
          </Button>
        </PaymentCard>
      );
    default:
      return (
        <PaymentCard payments={payment} email={email} isLoading={isLoading}>
          <Button
            loading={checkoutLoading}
            onClick={doCheckOut}
            style={{
              width: !xl ? '100%' : 'null',
            }}
          >
            {isTrial ? 'Start 30-Day Free Trial' : 'Subscribe Now'}
          </Button>
        </PaymentCard>
      );
  }
};

interface PaymentCardProps {
  payments: PaymentTypes;
  children: React.ReactNode;
  isLoading: boolean;
  email: string | null;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  payments,
  children,
  isLoading,
  email,
}) => {
  const { sm, xl } = Grid.useBreakpoint();

  if (isLoading) return null;

  return (
    <Card
      loading={isLoading}
      style={{
        width: '100%',
      }}
      bodyStyle={{
        width: '100%',
        padding: 8,
      }}
      id="payments-card"
    >
      <div className={styles.paymentCardBody}>
        <AntImage preview={false} src={payments.settingsImage} width={'100%'} />
        <div className={styles.paymentCard}>
          <div id="payment-information" className={styles.paymentInformation}>
            {sm ? (
              <Text strong>{payments.name}</Text>
            ) : (
              <Typography.Title level={3}>{payments.name}</Typography.Title>
            )}
            {email && <Text type="secondary">{`Email: ${mask(email)}`}</Text>}
          </div>

          <div id="payment-action" className={styles.paymentAction}>
            {children}
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
      </div>
    </Card>
  );
};
