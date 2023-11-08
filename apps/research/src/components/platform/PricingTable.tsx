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
import { useRouter } from 'next/router';

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
  const router = useRouter();

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

  React.useEffect(() => {
    if (!router.query.redirectUrl || !router.query.plan || !router.query.type)
      return;

    const { plan, redirectUrl, type } = router.query;
    if (productStatus.state == 'active') {
      router.push(redirectUrl as string);
    } else if (aocProductStatus.state === 'active' && plan === 'aoc') {
      router.push(redirectUrl as string);
    } else if (nnProductStatus.state === 'active' && plan === 'nn') {
      router.push(redirectUrl as string);
    } else if (twicProductStatus.state === 'active' && plan === 'twic') {
      router.push(redirectUrl as string);
    } else if (plan === 'pro') {
      if (type === 'monthly') {
        monthlyCheckOut();
      } else {
        annualCheckOut();
      }
    } else if (plan === 'aoc') {
      if (type === 'monthly') {
        aocMonthlyCheckout();
      } else {
        aocYearlyCheckout();
      }
    } else if (plan === 'nn') {
      if (type === 'monthly') {
        nnMonthlyCheckout();
      } else {
        nnYearlyCheckout();
      }
    } else if (plan === 'twic') {
      if (type === 'monthly') {
        twicMonthlyCheckout();
      } else {
        twicYearlyCheckout();
      }
    }
  }, [productStatus, aocProductStatus, nnProductStatus, twicProductStatus]);

  const getMonthlyActions = (
    state: {
      state: ProductStatus | 'loading' | null;
      priceId: string | null;
    },

    label: string = 'Renew PRO Subscription',
    priceId: string = monthlyPriceId,
    checkOut: () => Promise<void> = monthlyCheckOut,
    isLoading: boolean = montlyIsLoading,
    badge: boolean = false,
    trial: boolean = false
  ) => {
    switch (state.state) {
      case 'ended':
        return (
          <DashboardButton
            dashboard={dashboard}
            isLoading={isDashboardLoading}
            badge={badge}
          >
            {state.priceId === priceId ? 'Get Monthly Plan' : label}
          </DashboardButton>
        );
      case 'blocked':
        return (
          <DashboardButton
            dashboard={dashboard}
            isLoading={isDashboardLoading}
            badge={badge}
          >
            {state.priceId === priceId
              ? 'Get Monthly Plan'
              : 'Update Payment Details'}
          </DashboardButton>
        );
      case 'active':
        return (
          <DashboardButton
            dashboard={dashboard}
            isLoading={isDashboardLoading}
            badge={badge}
          >
            {state.priceId === priceId
              ? 'Get Monthly Plan'
              : 'Manage Subscription'}
          </DashboardButton>
        );
      default:
        return (
          <CheckOutButton
            trial={trial}
            checkOut={checkOut}
            isLoading={isLoading}
            badge={badge}
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
                  <LogoutActionButton
                    plan="aoc"
                    url={router.query.redirectUrl as string}
                    type="monthly"
                  />
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
                  <LogoutActionButton
                    plan="nn"
                    url={router.query.redirectUrl as string}
                    type="monthly"
                  />
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
                  <LogoutActionButton
                    plan="twic"
                    url={router.query.redirectUrl as string}
                    type="monthly"
                  />
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
            badge={'SAVE $15 by combining all subscriptions!'}
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
                  <LogoutActionButton
                    badge
                    plan="pro"
                    url={router.query.redirectUrl as string}
                    type="monthly"
                    trial
                  />
                ) : (
                  getMonthlyActions(
                    productStatus,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true,
                    true
                  )
                )}
              </>
            }
          />
        );
      default:
        return (
          <PricingCard
            badge={'SAVE $15 by combining all subscriptions!'}
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
                  <LogoutActionButton
                    badge
                    plan="pro"
                    url={router.query.redirectUrl as string}
                    type="monthly"
                    trial
                  />
                ) : (
                  getMonthlyActions(
                    productStatus,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true,
                    true
                  )
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
            isYear
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
                  <LogoutActionButton
                    plan="aoc"
                    url={router.query.redirectUrl as string}
                    type="year"
                  />
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
            isYear
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
                  <LogoutActionButton
                    plan="nn"
                    url={router.query.redirectUrl as string}
                    type="year"
                  />
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
            isYear
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
                  <LogoutActionButton
                    plan="twic"
                    url={router.query.redirectUrl as string}
                    type="year"
                  />
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
            isYear
            description={payments.description}
            image={payments.image}
            badge={'SAVE $150 by combining all subscriptions!'}
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
                  <LogoutActionButton
                    badge
                    plan="pro"
                    url={router.query.redirectUrl as string}
                    type="year"
                    trial
                  />
                ) : (
                  getAnnualActions(
                    productStatus,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true,
                    true
                  )
                )}
              </>
            }
          />
        );
      default:
        return (
          <PricingCard
            isYear
            badge={'SAVE $150 by combining all subscriptions!'}
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
                  <LogoutActionButton
                    badge
                    plan="pro"
                    url={router.query.redirectUrl as string}
                    type="year"
                    trial
                  />
                ) : (
                  getAnnualActions(
                    productStatus,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true,
                    true
                  )
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
    isLoading: boolean = annualIsLoading,
    badge: boolean = false,
    trial: boolean = false
  ) => {
    switch (state.state) {
      case 'ended':
        return (
          <DashboardButton
            dashboard={dashboard}
            isLoading={isDashboardLoading}
            badge={badge}
          >
            {state.priceId === priceId ? 'Get Yearly Plan' : label}
          </DashboardButton>
        );
      case 'blocked':
        return (
          <DashboardButton
            dashboard={dashboard}
            isLoading={isDashboardLoading}
            badge={badge}
          >
            {state.priceId === priceId
              ? 'Get Yearly Plan'
              : 'Update Payment Details'}
          </DashboardButton>
        );
      case 'active':
        return (
          <DashboardButton
            dashboard={dashboard}
            isLoading={isDashboardLoading}
            badge={badge}
          >
            {state.priceId === priceId
              ? 'Get Yearly Plan'
              : 'Manage Subscription'}
          </DashboardButton>
        );
      default:
        return (
          <CheckOutButton
            checkOut={checkOut}
            isLoading={isLoading}
            badge={badge}
            trial={trial}
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
        <Title level={3} style={{ margin: 0 }}>
          Select Your Subscriptions!
        </Title>
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
            count={'Save up to $150'}
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

interface LogoutActionButtonProps {
  badge?: boolean;
  plan?: ProductPlans;
  url?: string;
  type: 'monthly' | 'year';
  trial?: boolean;
}

const LogoutActionButton: React.FC<LogoutActionButtonProps> = ({
  url = window.location.href,
  badge = false,
  plan = 'pro',
  type = 'year',
  trial = false,
}) => {
  const {
    token: { colorInfo },
  } = useToken();

  const router = useRouter();

  const getUrl = () => {
    if (router.query.redirectUrl) {
      return window.location.href;
    } else {
      return (
        window.location.href +
        '/pricing' +
        '?redirectUrl=' +
        window.location.href
      );
    }
  };
  return (
    <Link
      href={{
        pathname: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth/signup`,
        query: { plan, redirect: getUrl(), type },
      }}
      role="grid"
      style={{
        width: '100%',
      }}
    >
      <Button
        block
        style={{
          ...(badge && {
            border: `1px solid ${colorInfo}`,
          }),
        }}
      >
        {trial ? 'Start 30-Day Free Trial' : 'Subscribe Now'}
      </Button>
    </Link>
  );
};

interface CheckOutButtonProps {
  checkOut: () => void;
  isLoading: boolean;
  badge?: boolean;
  trial?: boolean;
}

export const CheckOutButton: React.FC<CheckOutButtonProps> = ({
  checkOut,
  isLoading,
  badge = false,
  trial = false,
}) => {
  const {
    token: { colorInfo },
  } = useToken();
  return (
    <Button
      loading={isLoading}
      onClick={checkOut}
      block
      style={{
        ...(badge && {
          border: `1px solid ${colorInfo}`,
        }),
      }}
    >
      {trial ? 'Start 30-Day Free Trial' : 'Subscribe Now'}
    </Button>
  );
};

interface DashboardButtonProps extends React.PropsWithChildren {
  dashboard: () => void;
  isLoading: boolean;
  badge?: boolean;
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
  dashboard,
  isLoading,
  children,
  badge = false,
}) => {
  const {
    token: { colorInfo },
  } = useToken();
  return (
    <Button
      onClick={dashboard}
      loading={isLoading}
      icon={<EditOutlined />}
      style={{
        ...(badge && {
          border: `1px solid ${colorInfo}`,
        }),
      }}
      block
    >
      {children}
    </Button>
  );
};
