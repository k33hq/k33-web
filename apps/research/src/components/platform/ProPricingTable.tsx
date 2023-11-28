import { appStructure } from '@/config';
import {
  useCustomerCheckout,
  useCustomerDashboard,
  usePlan,
  useProductInfo,
} from '@/hooks';
import { Button, Card, Image, Typography, Radio, Badge, Space } from 'antd';
import * as React from 'react';
import {
  CheckOutButton,
  DashboardButton,
  LogoutActionButton,
} from './pricing/PricingButtons';
import { useRouter } from 'next/router';
import { ProductStatus } from '@/types';
import styles from './styles.module.scss';

const ProPrincingTable: React.FC = () => {
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
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        gap: 24,
        marginBottom: 120,
      }}
    >
      <Typography.Title
        level={2}
        style={{ maxWidth: 460, alignSelf: 'center' }}
      >
        Understand the crypto market and save time
      </Typography.Title>
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
      {plan === 'monthly' ? (
        <div
          id="pro-pricing-monthly"
          // style={{
          //   display: 'flex',
          //   flexDirection: 'row',
          //   marginTop: 32,
          //   gap: 32,
          // }}
          className={styles.proPricing}
        >
          {/* <Image
            src={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/pro_background.svg`}
            alt="pro-background"
            style={{ maxHeight: 600, borderRadius: 10 }}
            preview={false}
          /> */}
          <div
            style={{
              backgroundImage: `url(https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/pro_background.svg)`,
              borderRadius: 10,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              width: '100%',
            }}
          >
            <Space
              direction="horizontal"
              style={{
                margin: '0 auto',
                marginTop: 120,
                marginBottom: 120,
              }}
            >
              <Typography.Title style={{ color: 'white' }}>
                K33 Research
              </Typography.Title>
              <Typography.Title style={{ color: '#1155CC' }}>
                Pro
              </Typography.Title>
            </Space>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
                gap: 16,
              }}
            >
              <Typography.Title level={2} style={{ margin: 0 }}>
                {appStructure.payments.pro.name}
              </Typography.Title>
              <Typography.Text type="secondary">
                {appStructure.payments.pro.description}
              </Typography.Text>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  paddingBottom: 20,
                }}
              >
                <Typography.Title
                  level={4}
                  style={{ fontWeight: 800, margin: 0 }}
                >
                  {appStructure.payments.pro.monthlyPrice.split('.')[0]}
                </Typography.Title>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  /month
                </Typography.Title>
              </div>
            </div>
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
          </div>
        </div>
      ) : (
        <div id="pro-pricing-monthly" className={styles.proPricing}>
          <div
            style={{
              backgroundImage: `url(https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/pro_background.svg)`,
              borderRadius: 10,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              width: '100%',
            }}
          >
            <Space
              direction="horizontal"
              style={{
                margin: '0 auto',
                marginTop: 120,
                marginBottom: 120,
              }}
            >
              <Typography.Title style={{ color: 'white' }}>
                K33 Research
              </Typography.Title>
              <Typography.Title style={{ color: '#1155CC' }}>
                Pro
              </Typography.Title>
            </Space>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
                gap: 16,
              }}
            >
              <Typography.Title level={2} style={{ margin: 0 }}>
                {appStructure.payments.pro.name}
              </Typography.Title>
              <Typography.Text type="secondary">
                {appStructure.payments.pro.description}
              </Typography.Text>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  paddingBottom: 20,
                }}
              >
                <Typography.Title
                  level={4}
                  style={{ fontWeight: 800, margin: 0 }}
                >
                  {appStructure.payments.pro.yearlyPrice.split('.')[0]}
                </Typography.Title>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  /year
                </Typography.Title>
              </div>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProPrincingTable;