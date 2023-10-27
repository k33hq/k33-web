import * as React from 'react';
import { Card, Space, Typography, List, Image, Badge } from 'antd';
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
  badge?: string;
  isYear?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  image,
  action,
  price,
  description,
  plan,
  state,
  badge,
  isYear = false,
}) => {
  return (
    <Badge count={badge} offset={[-150, 0]} color="blue">
      <Card
        style={{
          width: '100%',
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
            <Typography.Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              {description}
            </Typography.Text>
            <Space dir="horizontal" size={2}>
              <Typography.Text strong>{price}</Typography.Text>
              <Typography.Text type="secondary">
                {isYear ? '/year' : '/month'}
              </Typography.Text>
            </Space>
          </Space>
        </Space>
        {action}
      </Card>
    </Badge>
  );
};

export default PricingCard;
