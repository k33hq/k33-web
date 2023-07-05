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
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
      extra={
        <Link href={'/token-valuation/valuation-principles'}>
          <AntLink underline>Read More</AntLink>
        </Link>
      }
    >
      <Text type="secondary">
        Few analyze the value of a cryptocurrency by looking at the drivers of-
        and the sizes of the value capture mechanisms. Cryptocurrencies have
        value capture mechanisms that should reflect the crypto’s value over
        time. We have constructed a high-level framework for assessing token
        prices to look closer at this largely uncharted territory.
      </Text>
      <Text type="secondary">
        We conceptually divide the fundamentals of a token price into three main
        components:
      </Text>
      <ul style={{ paddingLeft: 20 }}>
        <li>
          <Text type="secondary">
            Persistent Financial Premium (the store of value component)
          </Text>
        </li>
        <li>
          <Text type="secondary" style={{ margin: 0, padding: 0 }}>
            Money Function (the medium of exchange component)
          </Text>
        </li>
        <li>
          <Text type="secondary">
            Access Utility (the use of a token to access utility)
          </Text>
        </li>
      </ul>
      <Text type="secondary">
        By analyzing the potential for value capture from these three pillars,
        we can provide insight into the fair price of a token.
      </Text>
    </Card>
  );
};

export default ValuationPrincipleWidget;
