import * as React from 'react';
import { Space, Divider, List, theme, Typography, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useToken } = theme;

const features = [
  'The weekly market report keeping you up to speed',
  'The monthly outlook helping you plan ahead',
  'Token assessments based on data and economic theory',
  'Industry insights from our in-depth reports',
];

interface ProCheckoutCardProps {
  handleCheckout: () => void;
  label: string;
  isFreeTrial?: boolean;
}

const ProCheckoutCard: React.FC<ProCheckoutCardProps> = ({
  handleCheckout,
  label,
  isFreeTrial = false,
}) => {
  const {
    token: { colorBgContainer, borderRadius, colorPrimary },
  } = useToken();
  return (
    <Space
      id="ended-body"
      style={{
        backgroundColor: colorBgContainer,
        borderRadius: borderRadius,
        textAlign: 'start',
        padding: '24px 32px',
      }}
      direction="vertical"
      size={20}
    >
      <Space direction="vertical">
        <Title level={5} style={{ margin: 0 }}>
          K33 Research Pro
        </Title>
        <Space
          size="small"
          align="center"
          split={isFreeTrial ? <Divider type="vertical" /> : null}
        >
          <Space>
            <Title level={2} style={{ margin: 0 }}>
              $50
            </Title>
            <Text>month</Text>
          </Space>
          {isFreeTrial && (
            <Space>
              <Text>After Free Trial</Text>
            </Space>
          )}
        </Space>
      </Space>
      <Divider style={{ margin: 0 }} />
      <List
        split={false}
        style={{
          minWidth: 287,
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
              <CheckCircleFilled
                style={{
                  color: colorPrimary,
                }}
              />
              <Text>{feat}</Text>
            </Space>
          </List.Item>
        )}
      />
      <Button size="large" type="primary" block onClick={handleCheckout}>
        {label}
      </Button>
    </Space>
  );
};

export default ProCheckoutCard;
