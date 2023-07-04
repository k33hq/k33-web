import { Card, theme, Typography } from 'antd';
import Link from 'next/link';
import * as React from 'react';

const { useToken } = theme;
const { Link: AntLink, Text } = Typography;

const ValuationPrincipleWidget: React.FC = () => {
  const {
    token: { colorBgLayout },
  } = useToken();
  return (
    <Card
      title="Valuation Principles"
      style={{
        width: '100%',
      }}
      bordered
      headStyle={{
        backgroundColor: colorBgLayout,
      }}
      extra={
        <Link href={'/market-insights/monthly-outlooks'}>
          <AntLink underline>Read More</AntLink>
        </Link>
      }
    >
      <Text type="secondary">
        We are continuously working on a framework for assessing the fundamental
        value of a cryptocurrency token in order to provide our investors a
        toolset to evaluate token prices. Currently, we are conceptually
        dividing the fundamentals of a token price into three main components:
        Persistent Financial Premium (the store of value component); Money
        Function (the medium of exchange component); and Access Utility (the use
        of a token to access utility).
      </Text>
    </Card>
  );
};

export default ValuationPrincipleWidget;
