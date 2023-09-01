import * as React from 'react';
import { Space, Typography, Radio, Badge, Button, theme, Tag } from 'antd';
import { UserOutlined, UnlockTwoTone } from '@ant-design/icons';
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
  const {
    token: { colorTextTertiary },
  } = useToken();

  const [plan, setPlan] = React.useState<Plan>('monthly');

  const { productStatus, appState } = useProductInfo(
    appStructure.payments.productId
  );

  const { doCheckOut: annualCheckOut, isLoading: annualIsLoading } =
    useCustomerCheckout(appStructure.payments.annualPriceId);

  const { doCheckOut: monthlyCheckOut, isLoading: montlyIsLoading } =
    useCustomerCheckout(appStructure.payments.monthlyPriceId);

  const { customerDashboard: dashboard, isLoading: isDashboardLoading } =
    useCustomerDashboard();

  console.log(appState);

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
      <Radio.Group defaultValue={plan} buttonStyle="solid">
        <Badge
          count={'Save $100'}
          style={{
            fontSize: 8,
          }}
          offset={[-50, -2]}
          size="small"
          color="blue"
        >
          <Radio.Button
            checked={plan === 'year'}
            onChange={(e) => setPlan(e.target.value)}
            value="year"
          >
            Yearly Plan
          </Radio.Button>
        </Badge>
        <Radio.Button
          checked={plan === 'monthly'}
          defaultChecked
          value="monthly"
          onChange={(e) => setPlan(e.target.value)}
        >
          Montly Plan
        </Radio.Button>
      </Radio.Group>
      <div className="pricingTable">
        <PricingCard
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
            plan="PRO Plan"
            features={proPlanFeatures}
            price="50"
            action={appState === 'SIGNED_OUT' && <LogoutActionButton />}
          />
        ) : (
          <PricingCard
            plan="PRO Plan"
            icon={
              <UnlockTwoTone
                style={{
                  fontSize: 48,
                }}
              />
            }
            features={proPlanFeatures}
            price="500"
            promotions={<Tag color="blue">Save $100</Tag>}
            action={appState === 'SIGNED_OUT' && <LogoutActionButton />}
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
