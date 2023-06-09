import * as React from 'react';
import CallToActionCard from './CallToActionCard';
import { Button, Divider, List, Space, Typography, theme } from 'antd';
import Icon, { CheckCircleFilled } from '@ant-design/icons';
import styles from './styles.module.scss';

interface EndedCallProps {
  checkout: () => void;
}

const { Text, Title } = Typography;
const { useToken } = theme;

const features = [
  'The weekly market report keeping you up to speed',
  'The monthly outlook helping you plan ahead',
  'Token assessments based on data and economic theory',
  'Industry insights from our in-depth reports',
];

const EndedCall: React.FC<EndedCallProps> = ({ checkout }) => {
  const {
    token: { fontSizeSM, colorBgContainer, borderRadius, colorPrimary },
  } = useToken();
  return (
    <CallToActionCard>
      <Space className={styles.ended}>
        <Space
          id="ended-header"
          direction="vertical"
          className={styles.endedHeader}
        >
          <Title level={5} style={{ margin: 0 }}>
            Renew your K33 Research Pro subscription
          </Title>
          <Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            Subscribe again and regain full access to all research.
          </Text>
        </Space>
        <Space
          id="ended-body"
          style={{
            backgroundColor: colorBgContainer,
            borderRadius: borderRadius,
            width: '100%',
            textAlign: 'start',
          }}
          direction="vertical"
          size={20}
          className={styles.endedBody}
        >
          <Space direction="vertical">
            <Title level={5} style={{ margin: 0 }}>
              K33 Research Pro
            </Title>
            <Space size="small" align="center">
              <Title level={2} style={{ margin: 0 }}>
                $50
              </Title>
              <Text>month</Text>
            </Space>
          </Space>
          <Divider style={{ margin: 0 }} />
          <Space>
            <ul>
              {features.map((feature) => (
                <Space key={feature} size="middle">
                  <li>
                    <Text
                      style={{
                        fontSize: fontSizeSM,
                      }}
                    >
                      {feature}
                    </Text>
                  </li>
                </Space>
              ))}
            </ul>
          </Space>
          <Button type="primary" block onClick={checkout}>
            Renew Your Subscription
          </Button>
        </Space>
      </Space>
    </CallToActionCard>
  );
};

export default EndedCall;
