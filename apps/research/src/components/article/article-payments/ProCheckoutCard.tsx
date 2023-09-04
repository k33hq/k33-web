import * as React from 'react';
import {
  Space,
  Divider,
  List,
  theme,
  Typography,
  Button,
  Switch,
  Tag,
} from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { usePlan } from '@/hooks';

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
  isLoading?: boolean;
}

const ProCheckoutCard: React.FC<ProCheckoutCardProps> = ({
  handleCheckout,
  label,
  isFreeTrial = false,
  isLoading = false,
}) => {
  const {
    token: { colorBgContainer, borderRadius, colorPrimary },
  } = useToken();
  const { plan, setPlan } = usePlan();
  return (
    <Space
      id="ended-body"
      style={{
        backgroundColor: colorBgContainer,
        borderRadius: borderRadius,
        textAlign: 'start',
        padding: '20px 28px',
        width: '100%',
      }}
      direction="vertical"
      size={20}
    >
      <Space
        direction="vertical"
        align="center"
        style={{
          width: '100%',
        }}
        size={16}
      >
        <Space direction="horizontal" align="end" size="large">
          <Text disabled={plan === 'year'}>Monthly</Text>
          <Switch
            defaultChecked
            onChange={(isYear) => {
              setPlan(isYear ? 'year' : 'monthly');
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Tag color="blue">Save $100</Tag>
            <Text disabled={plan === 'monthly'}>Yearly</Text>
          </div>
        </Space>
        <Space
          size="small"
          align="center"
          split={isFreeTrial ? <Divider type="vertical" /> : null}
        >
          <Space>
            {plan === 'monthly' ? (
              <>
                <Title level={2} style={{ margin: 0 }}>
                  $50
                </Title>
                <Text>month</Text>
              </>
            ) : (
              <>
                <Title level={2} style={{ margin: 0 }}>
                  $500
                </Title>
                <Text>year</Text>
              </>
            )}
          </Space>
          {/* {isFreeTrial && (
            <Space>
              <Text>After Free Trial</Text>
            </Space>
          )} */}
        </Space>
        <Title level={5} style={{ margin: 0 }}>
          K33 Research Pro
        </Title>
      </Space>
      <Divider style={{ margin: 0 }} />
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
              paddingBottom: 0,
            }}
          >
            <Space align="start">
              <CheckCircleFilled
                style={{
                  color: colorPrimary,
                  fontSize: 24,
                }}
              />
              <Text
                style={{
                  fontWeight: 400,
                }}
              >
                {feat}
              </Text>
            </Space>
          </List.Item>
        )}
      />
      <Button
        loading={isLoading}
        size="large"
        type="primary"
        block
        onClick={handleCheckout}
      >
        {label}
      </Button>
    </Space>
  );
};

export default ProCheckoutCard;
