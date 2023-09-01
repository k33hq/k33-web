import * as React from 'react';
import { Space, Typography, Radio, Badge, Button, theme, Tag } from 'antd';
import { UserOutlined, UnlockTwoTone, EditOutlined } from '@ant-design/icons';
import {
  useCustomerCheckout,
  useCustomerDashboard,
  useProductInfo,
} from '@/hooks';
import { appStructure } from '@/config';
import Link from 'next/link';
import PricingCard from './PricingCard';
import { setTwoToneColor } from '@ant-design/icons';

setTwoToneColor('#777777');

const { useToken } = theme;
const { Title, Text } = Typography;

type Plan = 'monthly' | 'year';

const proPlanFeatures = [
  'The latest detailed insights into the markets',
  'The most important weekly crypto news distilled and explained',
  'Deep insight with our regular in-depth reports',
  'Fundamental token analysis',
  "DeFi narratives - what's the next big thing?",
  'And more!',
];

const PricingTable = () => {
  const [plan, setPlan] = React.useState<Plan>('monthly');

  const productId = appStructure.payments.productId;
  const monthlyPriceId = appStructure.payments.monthlyPriceId;
  const annualPriceId = appStructure.payments.annualPriceId;

  const { productStatus, appState } = useProductInfo(productId);
  const { doCheckOut: annualCheckOut, isLoading: annualIsLoading } =
    useCustomerCheckout(annualPriceId);

  const { doCheckOut: monthlyCheckOut, isLoading: montlyIsLoading } =
    useCustomerCheckout(monthlyPriceId);

  const { customerDashboard: dashboard, isLoading: isDashboardLoading } =
    useCustomerDashboard();

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
        <Title level={3}>Compare and Get Your Plan!</Title>
        <Text>
          The right plan is waiting for you. Subscribe and get full access to
          all research content.
        </Text>
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

      <div className="pricingTable">
        <PricingCard
          state={
            appState !== 'SIGNED_OUT' &&
            (productStatus.state === null || productStatus.state === 'ended')
              ? 'active'
              : undefined
          }
          plan="Free Plan"
          icon={<UserOutlined style={{ fontSize: 48 }} />}
          features={['Our weekly newsletter']}
          price="0"
          action={
            appState === 'SIGNED_OUT' && (
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
                role="grid"
              >
                <Button>Sign In</Button>
              </Link>
            )
          }
        />
        {plan === 'monthly' ? (
          <PricingCard
            icon={
              <UnlockTwoTone
                style={{
                  fontSize: 48,
                }}
              />
            }
            {...(productStatus.priceId === monthlyPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === monthlyPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            plan="PRO Plan"
            features={proPlanFeatures}
            price="50"
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
        ) : (
          <PricingCard
            plan="PRO Plan"
            date="year"
            icon={
              <UnlockTwoTone
                style={{
                  fontSize: 48,
                }}
              />
            }
            {...(productStatus.priceId === annualPriceId &&
              productStatus.state === 'blocked' && {
                state: 'blocked',
              })}
            {...(productStatus.priceId === annualPriceId &&
              productStatus.state === 'active' && {
                state: 'active',
              })}
            features={proPlanFeatures}
            price="500"
            promotions={<Tag color="blue">Save $100</Tag>}
            action={
              appState === 'SIGNED_OUT' ? (
                <LogoutActionButton />
              ) : (
                getAnnualActions()
              )
            }
          />
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
    <Space direction="vertical" size={8} align="center">
      <Link
        href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
        role="grid"
      >
        <Button type="primary">Start 30-Day Free Trial</Button>
      </Link>
      <Text
        style={{
          color: colorTextTertiary,
        }}
      >
        No credit card required
      </Text>
    </Space>
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
    <Space direction="vertical" size={8} align="center">
      <Button loading={isLoading} onClick={checkOut} type="primary">
        Start 30-Day Free Trial
      </Button>
      <Text
        style={{
          color: colorTextTertiary,
        }}
      >
        No credit card required
      </Text>
    </Space>
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
    >
      {children}
    </Button>
  );
};
