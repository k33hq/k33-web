import * as React from 'react';
import { Button, theme } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Payments, ProductPlans } from '@/types';
import { useRouter } from 'next/router';

interface LogoutActionButtonProps {
  badge?: boolean;
  plan?: ProductPlans;
  url?: string;
  type: 'monthly' | 'year';
  trial?: boolean;
}

export const LogoutActionButton: React.FC<LogoutActionButtonProps> = ({
  url = window.location.href,
  badge = false,
  plan = 'pro',
  type = 'year',
  trial = false,
}) => {
  const {
    token: { colorInfo },
  } = theme.useToken();

  const router = useRouter();

  const getUrl = () => {
    if (router.query.redirectUrl) {
      return window.location.href;
    } else {
      return (
        `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/pricing` +
        '?redirectUrl=' +
        `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/`
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
  } = theme.useToken();
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
  } = theme.useToken();
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
