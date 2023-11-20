import * as React from 'react';
import { Card, Space, Typography, List, Grid } from 'antd';

interface PricingCardProps {
  action: React.ReactNode;

  price: string;
  plan: string;

  image: React.ReactNode;

  isYear?: boolean;
  pricingCardDescription: Array<string>;
}

const PricingCard: React.FC<PricingCardProps> = ({
  image,
  action,
  price,
  plan,
  pricingCardDescription,
  isYear = false,
}) => {
  const { lg, sm, md } = Grid.useBreakpoint();
  return (
    <Card
      style={{
        width: '100%',
        padding: 24,
        boxShadow: '0 2px 45px rgba(0, 0, 0, .08)',
      }}
      bordered={false}
    >
      {image}
      <Space
        direction="vertical"
        align="center"
        size={16}
        style={{ paddingBottom: 16, width: '100%' }}
      >
        <Space
          direction="vertical"
          size={4}
          style={{
            height: lg ? 420 : md ? 220 : sm ? 260 : 360,
          }}
        >
          <Typography.Title level={2}>{plan}</Typography.Title>
          <List
            dataSource={pricingCardDescription}
            size="small"
            renderItem={(item) => (
              <List.Item
                key={item}
                style={{ border: 'none', paddingLeft: 0, marginLeft: 0 }}
              >
                <span style={{ color: '#15c', paddingRight: 8 }}>→</span>
                {item}
              </List.Item>
            )}
          />
        </Space>
      </Space>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingBottom: 20,
        }}
      >
        <Typography.Title level={4} style={{ fontWeight: 800, margin: 0 }}>
          {price.split('.')[0]}
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {isYear ? '/year' : '/month'}
        </Typography.Title>
      </div>
      {action}
    </Card>
  );
};

export default PricingCard;
