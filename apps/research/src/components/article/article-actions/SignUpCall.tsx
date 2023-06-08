import { Card, Space, Typography, theme } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';

const { useToken } = theme;
const { Text, Title } = Typography;

const SignUpCall: React.FC = () => {
  const {
    token: { colorBgLayout },
  } = useToken();
  return (
    <Card
      style={{ backgroundColor: colorBgLayout }}
      hoverable
      className={styles.signup}
    >
      <div id="signup-header">
        <Title level={5} type="secondary">
          Sign up for K33 Research Pro and keep reading our research
        </Title>
      </div>
      <div id="sigup-content">
        <Space size={32} direction="vertical">
          <Text>
            Subscribe and get full access to all research. No credit card needed
            for free trial.
          </Text>
        </Space>
      </div>
      <div id="signup-footer">
        <Text>No charge until the trial is complete. Cancel anytime.</Text>
        <Text>Already subscribed? Sign In Here</Text>
      </div>
    </Card>
  );
};

export default SignUpCall;
