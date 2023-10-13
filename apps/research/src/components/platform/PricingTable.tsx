import * as React from 'react';
import {
  Space,
  Typography,
  Radio,
  Badge,
  Button,
  theme,
  Tag,
  Row,
  Col,
} from 'antd';
import { UserOutlined, UnlockTwoTone, EditOutlined } from '@ant-design/icons';
import {
  useCustomerCheckout,
  useCustomerDashboard,
  usePlan,
  useProductInfo,
} from '@/hooks';
import { appStructure } from '@/config';
import Link from 'next/link';
import PricingCard from './PricingCard';
import { setTwoToneColor } from '@ant-design/icons';
import { proFeatures } from '@/utils';
import { Payments, ProductPlans } from '@/types';

setTwoToneColor('#777777');

const { useToken } = theme;
const { Title, Text } = Typography;

const proPlanFeatures = [
  'The latest detailed insights into the markets',
  'The most important weekly crypto news distilled and explained',
  'Deep insight with our regular in-depth reports',
  'Fundamental token analysis',
  "DeFi narratives - what's the next big thing?",
  'And more!',
];

const PricingTable = () => {
  const { plan, setPlan } = usePlan();

  const { customerDashboard: dashboard, isLoading: isDashboardLoading } =
    useCustomerDashboard();

  const productId = appStructure.payments.pro.productId;
  const monthlyPriceId = appStructure.payments.pro.monthlyPriceId;
  const annualPriceId = appStructure.payments.pro.annualPriceId;
  const { productStatus, appState } = useProductInfo(productId);
  const { doCheckOut: monthlyCheckOut, isLoading: montlyIsLoading } =
    useCustomerCheckout(monthlyPriceId);
  const { doCheckOut: annualCheckOut, isLoading: annualIsLoading } =
    useCustomerCheckout(annualPriceId);

  // aoc
  const aocProductId = appStructure.payments.aoc.productId;
  const aocMonthlyPriceId = appStructure.payments.aoc.monthlyPriceId;
  const aocYearlyPriceId = appStructure.payments.aoc.annualPriceId;
  const { productStatus: aocProductStatus } = useProductInfo(
    appStructure.payments.aoc.productId
  );
  const { doCheckOut: aocMonthlyCheckout, isLoading: aocMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.aoc.monthlyPriceId);
  const { doCheckOut: aocYearlyCheckout, isLoading: aocYearlyLoading } =
    useCustomerCheckout(appStructure.payments.aoc.annualPriceId);

  // nn
  const nnProductId = appStructure.payments.nn.productId;
  const nnMonthlyPriceId = appStructure.payments.nn.monthlyPriceId;
  const nnYearlyPriceId = appStructure.payments.nn.annualPriceId;
  const { productStatus: nnProductStatus } = useProductInfo(
    appStructure.payments.aoc.productId
  );
  const { doCheckOut: nnMonthlyCheckout, isLoading: nnMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.nn.monthlyPriceId);
  const { doCheckOut: nnYearlyCheckout, isLoading: nnYearlyLoading } =
    useCustomerCheckout(appStructure.payments.nn.annualPriceId);

  //twic
  const twicProductId = appStructure.payments.twic.productId;
  const twicMonthlyPriceId = appStructure.payments.twic.monthlyPriceId;
  const twiceYearlyPriceId = appStructure.payments.twic.annualPriceId;
  const { productStatus: twicProductStatus } = useProductInfo(
    appStructure.payments.twic.productId
  );
  const { doCheckOut: twicMonthlyCheckout, isLoading: twicMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.twic.monthlyPriceId);
  const { doCheckOut: twicYearlyCheckout, isLoading: twicYearlyLoading } =
    useCustomerCheckout(appStructure.payments.twic.annualPriceId);

  const getMonthlyActions = () => {
    switch (productStatus.state) {
      case 'ended':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {productStatus.priceId === annualPriceId
              ? 'Get Monthly Plan'
              : 'Renew PRO Subscription'}
          </DashboardButton>
        );
      case 'blocked':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {productStatus.priceId === annualPriceId
              ? 'Get Monthly Plan'
              : 'Update Payment Details'}
          </DashboardButton>
        );
      case 'active':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {productStatus.priceId === annualPriceId
              ? 'Get Monthly Plan'
              : 'Manage Subscription'}
          </DashboardButton>
        );
      default:
        return (
          <CheckOutButton
            checkOut={monthlyCheckOut}
            isLoading={montlyIsLoading}
          />
        );
    }
  };

  const getMonthlyPaymentCard = (plan: ProductPlans, payments: Payments) => {
    switch (plan) {
      case 'aoc':
        return (
          <PricingCard
            image={payments.image}
            {...(productStatus.priceId === aocMonthlyPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === aocMonthlyPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            description={payments.description}
            price={payments.monthlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getMonthlyActions()
                )}
              </>
            }
          />
        );
      case 'nn':
        return (
          <PricingCard
            description={payments.description}
            image={payments.image}
            {...(productStatus.priceId === nnMonthlyPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === nnMonthlyPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.monthlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getMonthlyActions()
                )}
              </>
            }
          />
        );
      case 'twic':
        return (
          <PricingCard
            description={payments.description}
            image={payments.image}
            {...(productStatus.priceId === twicMonthlyPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === twicMonthlyPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.monthlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getMonthlyActions()
                )}
              </>
            }
          />
        );
      case 'pro':
        return (
          <PricingCard
            description={payments.description}
            image={payments.image}
            {...(productStatus.priceId === monthlyPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === monthlyPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.monthlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getMonthlyActions()
                )}
              </>
            }
          />
        );
      default:
        return (
          <PricingCard
            description={payments.description}
            image={payments.image}
            {...(productStatus.priceId === monthlyPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === monthlyPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.monthlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getMonthlyActions()
                )}
              </>
            }
          />
        );
    }
  };

  const getAnnualActions = () => {
    switch (productStatus.state) {
      case 'ended':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {productStatus.priceId === monthlyPriceId
              ? 'Get Yearly Plan'
              : 'Renew PRO Subscription'}
          </DashboardButton>
        );
      case 'blocked':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {productStatus.priceId === monthlyPriceId
              ? 'Get Yearly Plan'
              : 'Update Payment Details'}
          </DashboardButton>
        );
      case 'active':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {productStatus.priceId === monthlyPriceId
              ? 'Get Yearly Plan'
              : 'Manage Subscription'}
          </DashboardButton>
        );
      default:
        return (
          <CheckOutButton
            checkOut={annualCheckOut}
            isLoading={annualIsLoading}
          />
        );
    }
  };

  return (
    <>
      <Space.Compact
        direction="vertical"
        style={{
          textAlign: 'center',
        }}
      >
        <Title level={3}>Select Your Plans!</Title>
        {/* <Text>
          The right plan is waiting for you. Subscribe and get full access to
          all research content.
        </Text> */}
      </Space.Compact>

      <Radio.Group defaultValue={plan} optionType="button" buttonStyle="solid">
        <Radio.Button
          checked={plan === 'monthly'}
          defaultChecked
          value="monthly"
          onChange={(e) => setPlan(e.target.value)}
        >
          Monthly Plan
        </Radio.Button>

        <Radio.Button
          checked={plan === 'year'}
          onChange={(e) => setPlan(e.target.value)}
          value="year"
        >
          <Badge
            count={'Save $100'}
            style={{
              fontSize: 8,
            }}
            offset={[-35, -10]}
            size="small"
            color="blue"
          >
            Yearly Plan
          </Badge>
        </Radio.Button>
      </Radio.Group>

      <div>
        {plan === 'monthly' ? (
          <Row wrap gutter={[40, 40]}>
            {Object.keys(appStructure.payments).map((plan) => (
              <Col xs={24} sm={24} lg={6} key={plan}>
                {getMonthlyPaymentCard(
                  plan as ProductPlans,
                  appStructure.payments[plan as ProductPlans]
                )}
              </Col>
            ))}
          </Row>
        ) : null}
      </div>
    </>
  );
};

export default PricingTable;

const LogoutActionButton = () => {
  const {
    token: { colorTextTertiary },
  } = useToken();
  return (
    <Link
      href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
      role="grid"
      style={{
        width: '100%',
      }}
    >
      <Button block type="primary">
        Start 30-Day Free Trial
      </Button>
    </Link>
  );
};

interface CheckOutButtonProps {
  checkOut: () => void;
  isLoading: boolean;
}

export const CheckOutButton: React.FC<CheckOutButtonProps> = ({
  checkOut,
  isLoading,
}) => {
  const {
    token: { colorTextTertiary },
  } = useToken();
  return (
    <Button loading={isLoading} onClick={checkOut} type="primary" block>
      Start 30-Day Free Trial
    </Button>
  );
};

interface DashboardButtonProps extends React.PropsWithChildren {
  dashboard: () => void;
  isLoading: boolean;
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
  dashboard,
  isLoading,
  children,
}) => {
  return (
    <Button
      onClick={dashboard}
      loading={isLoading}
      icon={<EditOutlined />}
      type="primary"
      block
    >
      {children}
    </Button>
  );
};
