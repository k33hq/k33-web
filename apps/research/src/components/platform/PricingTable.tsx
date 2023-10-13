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
import { Payments, ProductPlans, ProductStatus } from '@/types';

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
  const { productStatus: aocProductStatus } = useProductInfo(aocProductId);
  const { doCheckOut: aocMonthlyCheckout, isLoading: aocMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.aoc.monthlyPriceId);
  const { doCheckOut: aocYearlyCheckout, isLoading: aocYearlyLoading } =
    useCustomerCheckout(appStructure.payments.aoc.annualPriceId);

  // nn
  const nnProductId = appStructure.payments.nn.productId;
  const nnMonthlyPriceId = appStructure.payments.nn.monthlyPriceId;
  const nnYearlyPriceId = appStructure.payments.nn.annualPriceId;
  const { productStatus: nnProductStatus } = useProductInfo(nnProductId);
  const { doCheckOut: nnMonthlyCheckout, isLoading: nnMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.nn.monthlyPriceId);
  const { doCheckOut: nnYearlyCheckout, isLoading: nnYearlyLoading } =
    useCustomerCheckout(appStructure.payments.nn.annualPriceId);

  //twic
  const twicProductId = appStructure.payments.twic.productId;
  const twicMonthlyPriceId = appStructure.payments.twic.monthlyPriceId;
  const twiceYearlyPriceId = appStructure.payments.twic.annualPriceId;
  const { productStatus: twicProductStatus } = useProductInfo(twicProductId);
  const { doCheckOut: twicMonthlyCheckout, isLoading: twicMonthlyLoading } =
    useCustomerCheckout(appStructure.payments.twic.monthlyPriceId);
  const { doCheckOut: twicYearlyCheckout, isLoading: twicYearlyLoading } =
    useCustomerCheckout(appStructure.payments.twic.annualPriceId);

  const getMonthlyActions = (
    state: {
      state: ProductStatus | 'loading' | null;
      priceId: string | null;
    },

    label: string = 'Renew PRO Subscription',
    priceId: string = monthlyPriceId,
    checkOut: () => Promise<void> = monthlyCheckOut,
    isLoading: boolean = montlyIsLoading
  ) => {
    switch (state.state) {
      case 'ended':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {state.priceId === priceId ? 'Get Monthly Plan' : label}
          </DashboardButton>
        );
      case 'blocked':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {state.priceId === priceId
              ? 'Get Monthly Plan'
              : 'Update Payment Details'}
          </DashboardButton>
        );
      case 'active':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {state.priceId === priceId
              ? 'Get Monthly Plan'
              : 'Manage Subscription'}
          </DashboardButton>
        );
      default:
        return <CheckOutButton checkOut={checkOut} isLoading={isLoading} />;
    }
  };

  const getMonthlyPaymentCard = (plan: ProductPlans, payments: Payments) => {
    switch (plan) {
      case 'aoc':
        return (
          <PricingCard
            image={payments.image}
            {...(aocProductStatus.priceId === aocMonthlyPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(aocProductStatus.priceId === aocMonthlyPriceId &&
              aocProductStatus.state === 'active' && {
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
                  getMonthlyActions(
                    aocProductStatus,
                    payments.name,
                    aocMonthlyPriceId,
                    aocMonthlyCheckout,
                    aocMonthlyLoading
                  )
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
            {...(nnProductStatus.priceId === nnMonthlyPriceId &&
              nnProductStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(nnProductStatus.priceId === nnMonthlyPriceId &&
              nnProductStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.monthlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getMonthlyActions(
                    nnProductStatus,
                    payments.name,
                    nnMonthlyPriceId,
                    nnMonthlyCheckout,
                    nnMonthlyLoading
                  )
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
            {...(twicProductStatus.priceId === twicMonthlyPriceId &&
              twicProductStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(twicProductStatus.priceId === twicMonthlyPriceId &&
              twicProductStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.monthlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getMonthlyActions(
                    twicProductStatus,
                    payments.name,
                    twicMonthlyPriceId,
                    twicMonthlyCheckout,
                    twicMonthlyLoading
                  )
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
                  getMonthlyActions(productStatus)
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
                  getMonthlyActions(productStatus)
                )}
              </>
            }
          />
        );
    }
  };

  const getYearlyPaymentCard = (plan: ProductPlans, payments: Payments) => {
    switch (plan) {
      case 'aoc':
        return (
          <PricingCard
            image={payments.image}
            {...(aocProductStatus.priceId === aocYearlyPriceId &&
              aocProductStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(aocProductStatus.priceId === aocYearlyPriceId &&
              aocProductStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            description={payments.description}
            price={payments.yearlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getAnnualActions(
                    aocProductStatus,
                    payments.name,
                    aocYearlyPriceId,
                    aocYearlyCheckout,
                    aocYearlyLoading
                  )
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
            {...(nnProductStatus.priceId === nnYearlyPriceId &&
              nnProductStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(nnProductStatus.priceId === nnYearlyPriceId &&
              nnProductStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.yearlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getAnnualActions(
                    nnProductStatus,
                    payments.name,
                    nnYearlyPriceId,
                    nnYearlyCheckout,
                    nnYearlyLoading
                  )
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
            {...(twicProductStatus.priceId === twiceYearlyPriceId &&
              twicProductStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(twicProductStatus.priceId === twiceYearlyPriceId &&
              twicProductStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.yearlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getAnnualActions(
                    twicProductStatus,
                    payments.name,
                    twiceYearlyPriceId,
                    twicYearlyCheckout,
                    twicYearlyLoading
                  )
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
            {...(productStatus.priceId === annualPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === annualPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.yearlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getAnnualActions(productStatus)
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
            {...(productStatus.priceId === annualPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === annualPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan={payments.name}
            price={payments.yearlyPrice}
            action={
              <>
                {appState === 'SIGNED_OUT' ? (
                  <LogoutActionButton />
                ) : (
                  getAnnualActions(productStatus)
                )}
              </>
            }
          />
        );
    }
  };

  const getAnnualActions = (
    state: {
      state: ProductStatus | 'loading' | null;
      priceId: string | null;
    },
    label: string = 'Renew PRO Subscription',
    priceId: string = annualPriceId,
    checkOut: () => Promise<void> = annualCheckOut,
    isLoading: boolean = annualIsLoading
  ) => {
    switch (state.state) {
      case 'ended':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {state.priceId === priceId ? 'Get Yearly Plan' : label}
          </DashboardButton>
        );
      case 'blocked':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {state.priceId === priceId
              ? 'Get Yearly Plan'
              : 'Update Payment Details'}
          </DashboardButton>
        );
      case 'active':
        return (
          <DashboardButton dashboard={dashboard} isLoading={isDashboardLoading}>
            {state.priceId === priceId
              ? 'Get Yearly Plan'
              : 'Manage Subscription'}
          </DashboardButton>
        );
      default:
        return <CheckOutButton checkOut={checkOut} isLoading={isLoading} />;
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
            count={'Save up to $140'}
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
          <Row wrap gutter={[16, 16]}>
            {Object.keys(appStructure.payments).map((plan) => (
              <Col xs={24} sm={24} lg={6} key={plan}>
                {getMonthlyPaymentCard(
                  plan as ProductPlans,
                  appStructure.payments[plan as ProductPlans]
                )}
              </Col>
            ))}
          </Row>
        ) : (
          <Row wrap gutter={[16, 16]}>
            {Object.keys(appStructure.payments).map((plan) => (
              <Col xs={24} sm={24} lg={6} key={plan}>
                {getYearlyPaymentCard(
                  plan as ProductPlans,
                  appStructure.payments[plan as ProductPlans]
                )}
              </Col>
            ))}
          </Row>
        )}
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
      <Button block>Start 30-Day Free Trial</Button>
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
    <Button loading={isLoading} onClick={checkOut} block>
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
      block
    >
      {children}
    </Button>
  );
};
