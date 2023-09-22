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
  'Ahead of the Curve – The Weekly Market Report',
  'The monthly outlook helping you plan ahead',
  'Token assessments based on data and economic theory',
  'Industry insights from our in-depth reports',
];

interface ProCheckoutCardProps {
  handleCheckout: () => void;
  handleYearlyCheckout: () => void;
  label: string;
  isFreeTrial?: boolean;
  isLoading?: boolean;
  isEx?: boolean;
}

const ProCheckoutCard: React.FC<ProCheckoutCardProps> = ({
  handleCheckout,
  handleYearlyCheckout,
  label,
  isFreeTrial = false,
  isLoading = false,
  isEx = false,
}) => {
  const {
    token: {
      colorBgContainer,
      borderRadius,
      colorPrimary,
      colorTextQuaternary,
    },
  } = useToken();
  const { plan, setPlan } = usePlan();
  return (
    <div
      id="ended-body"
      style={{
        backgroundColor: colorBgContainer,
        borderRadius: borderRadius,
        textAlign: 'start',
        padding: '20px 28px',
        width: '100%',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <Space
        direction="vertical"
        align="center"
        style={{
          width: '100%',
        }}
        size={16}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          <Button onClick={() => setPlan('monthly')} type="text">
            <Text
              {...(plan === 'year' && {
                style: {
                  color: colorTextQuaternary,
                },
              })}
            >
              Monthly
            </Text>
          </Button>
          <div style={{ paddingBottom: 5 }}>
            <Switch
              defaultChecked={plan === 'year'}
              checked={plan === 'year'}
              onChange={(isYear) => {
                setPlan(isYear ? 'year' : 'monthly');
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Tag color="blue">Save $100</Tag>
            <Button onClick={() => setPlan('year')} type="text">
              <Text
                {...(plan === 'monthly' && {
                  style: {
                    color: colorTextQuaternary,
                  },
                })}
              >
                Yearly
              </Text>
            </Button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: isEx ? 24 : 0,
          }}
        >
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
        </div>
      </Space>

      {!isEx && (
        <>
          <Divider />
          <List
            split={false}
            style={{
              width: '100%',
              padding: 0,
              paddingBottom: 16,
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
        </>
      )}

      {plan === 'monthly' ? (
        <Button
          loading={isLoading}
          size="large"
          type="primary"
          block
          onClick={handleCheckout}
        >
          {label}
        </Button>
      ) : (
        <Button
          loading={isLoading}
          size="large"
          type="primary"
          block
          onClick={handleYearlyCheckout}
        >
          {label}
        </Button>
      )}
    </div>
  );
};

export default ProCheckoutCard;
