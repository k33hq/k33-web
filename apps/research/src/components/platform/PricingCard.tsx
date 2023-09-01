import * as React from 'react';
import { Card, Space, Typography, List } from 'antd';
import {
  UserOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons';
const { Title, Text } = Typography;

interface PricingCardProps {
  action: React.ReactNode;
  features: Array<string>;
  price: string;
  plan: string;
  promotions?: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({
  action,
  features,
  price,
  plan,
  promotions,
}) => {
  return (
    <Card
      style={{
        width: '100%',
        maxWidth: 325,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Space direction="vertical" align="center" size={24}>
        <Space align="center" direction="vertical" size={8}>
          {promotions}
          <UserOutlined
            style={{
              fontSize: 48,
            }}
          />
          <Title
            style={{
              margin: 0,
            }}
            level={5}
          >
            {plan}
          </Title>
        </Space>
        <Space.Compact
          direction="horizontal"
          style={{
            gap: 4,
            alignItems: 'end',
            justifyContent: 'center',
          }}
        >
          <Text type="secondary">$</Text>
          <Title
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            {price}
          </Title>
          <Text type="secondary">/ year</Text>
        </Space.Compact>
        <List
          split={false}
          style={{
            width: '100%',
            padding: 0,
          }}
          dataSource={features}
          renderItem={(feat) => (
            <List.Item
              style={{
                margin: 0,
                paddingBottom: 8,
              }}
            >
              <Space align="start">
                <CheckCircleOutlined />
                <Text type="secondary">{feat}</Text>
              </Space>
            </List.Item>
          )}
        />

        {action}
      </Space>
    </Card>
  );
};

export default PricingCard;
