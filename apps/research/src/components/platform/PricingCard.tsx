import * as React from 'react';
import { Card, Space, Typography, List, Image } from 'antd';
import {
  UserOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons';
const { Title, Text } = Typography;

interface PricingCardProps {
  action: React.ReactNode;
  description: string;
  price: string;
  plan: string;
  state?: 'blocked' | 'active';
  image: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  image,
  action,
  price,
  description,
  plan,
  state,
}) => {
  return (
    <Card
      style={{
        width: '100%',
      }}
      {...(state === 'active' && { title: 'ACTIVE PLAN' })}
      {...(state === 'blocked' && { title: 'BLOCKED PLAN' })}
      headStyle={{
        ...(state === 'active' && { background: 'black' }),
        ...(state === 'blocked' && { background: 'var(--red-6, #F5222D)' }),
      }}
      cover={<Image preview={false} src={image} alt="product-image" />}
    >
      <Space
        direction="vertical"
        align="center"
        size={16}
        style={{ paddingBottom: 16, height: 200 }}
      >
        <Space direction="vertical" size={4}>
          <Typography.Text strong>{plan}</Typography.Text>
          <Typography.Text type="secondary">{description}</Typography.Text>
          <Typography.Text strong>{price}</Typography.Text>
        </Space>
      </Space>
      {action}
    </Card>
  );
};

export default PricingCard;
