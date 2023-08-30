import * as React from 'react';
import {
  Space,
  Typography,
  Radio,
  Badge,
  Card,
  List,
  Button,
  theme,
} from 'antd';
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { useToken } = theme;
const { Title, Text } = Typography;

type Plan = 'monthly' | 'year';

const proPlanFeatures = [
  'The latest detailed insights into the markets',
  'The most important weekly crypto news distilled and explained',
  'Deep insight with our regular in-depth reports',
  'Fundamental token analysis',
  "DeFi narratives - what's the next big thing?",
  'And more!',
];

const PricingTable = () => {
  const {
    token: { colorBgContainer, colorPrimary },
  } = useToken();

  const [plan, setPlan] = React.useState<Plan>('monthly');
  return (
    <>
      <Space.Compact
        direction="vertical"
        style={{
          textAlign: 'center',
        }}
      >
        <Title level={3}>Compare and Get Your Plan!</Title>
        <Text>
          The right plan is waiting for you. Subscribe and get full access to
          all research content.
        </Text>
      </Space.Compact>
      <Radio.Group defaultValue={plan} buttonStyle="solid">
        <Badge
          count={'Save $100'}
          style={{
            fontSize: 8,
          }}
          offset={[-50, -2]}
          size="small"
          color="blue"
        >
          <Radio.Button
            checked={plan === 'year'}
            onChange={(e) => setPlan(e.target.value)}
            value="year"
          >
            Yearly Plan
          </Radio.Button>
        </Badge>
        <Radio.Button
          checked={plan === 'monthly'}
          defaultChecked
          value="monthly"
          onChange={(e) => setPlan(e.target.value)}
        >
          Montly Plan
        </Radio.Button>
      </Radio.Group>
      <div className="pricingTable">
        <Card
          style={{
            width: '100%',
            maxWidth: 325,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Space direction="vertical" align="center">
            <Space align="center">
              <UserOutlined />
              <Title
                style={{
                  margin: 0,
                }}
                level={5}
              >
                Free Plan
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
                0
              </Title>
              <Text>/ year</Text>
            </Space.Compact>
            <List
              split={false}
              style={{
                width: '100%',
                padding: 0,
              }}
              dataSource={['Our weekly newletter']}
              renderItem={(feat) => (
                <List.Item
                  style={{
                    margin: 0,
                    paddingBottom: 8,
                  }}
                >
                  <Space align="start">
                    <CheckCircleOutlined />
                    <Text>{feat}</Text>
                  </Space>
                </List.Item>
              )}
            />
            <Button>Sign up </Button>
          </Space>
        </Card>
        {plan === 'monthly' ? (
          <Card style={{ maxWidth: 325 }}>
            <Space direction="vertical" align="center">
              <Space align="center">
                <UserOutlined />
                <Title
                  style={{
                    margin: 0,
                  }}
                  level={5}
                >
                  Pro Plan
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
                  50
                </Title>
                <Text>/ year</Text>
              </Space.Compact>
              <List
                split={false}
                style={{
                  width: '100%',
                  padding: 0,
                }}
                dataSource={proPlanFeatures}
                renderItem={(feat) => (
                  <List.Item
                    style={{
                      margin: 0,
                      paddingBottom: 8,
                    }}
                  >
                    <Space align="start">
                      <CheckCircleOutlined />
                      <Text>{feat}</Text>
                    </Space>
                  </List.Item>
                )}
              />
              <Button>Sign up </Button>
            </Space>
          </Card>
        ) : (
          <Card style={{ maxWidth: 325 }}>
            <Space direction="vertical" align="center">
              <Space align="center">
                <UserOutlined />
                <Title
                  style={{
                    margin: 0,
                  }}
                  level={5}
                >
                  Pro Plan
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
                  500
                </Title>
                <Text>/ year</Text>
              </Space.Compact>
              <List
                split={false}
                style={{
                  width: '100%',
                  padding: 0,
                }}
                dataSource={proPlanFeatures}
                renderItem={(feat) => (
                  <List.Item
                    style={{
                      margin: 0,
                      paddingBottom: 8,
                    }}
                  >
                    <Space align="start">
                      <CheckCircleOutlined />
                      <Text>{feat}</Text>
                    </Space>
                  </List.Item>
                )}
              />
              <Button>Sign up </Button>
            </Space>
          </Card>
        )}
      </div>
    </>
  );
};

export default PricingTable;
