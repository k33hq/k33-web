import { Card, Space, Typography, theme } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';
import { Auth } from 'platform-js';
import config from '@/firebase/config';

const { useToken } = theme;
const { Text, Title } = Typography;

const SignUpCall: React.FC = () => {
  const {
    token: { colorBgLayout },
  } = useToken();
  return (
    <Card
      style={{
        backgroundColor: colorBgLayout,
        width: '100%',
      }}
      hoverable
    >
      <div id="sign-up-action" className={styles.signup}>
        <Space direction="vertical" size="small" align="center">
          <Title level={5} editable={false}>
            Sign up for K33 Research Pro and keep reading our research
          </Title>
          <Text>
            Subscribe and get full access to all research. No credit card needed
            for free trial.
          </Text>
        </Space>
        <Space direction="vertical" size="small" align="center">
          <Auth
            firebaseConfig={config}
            onSuccessLogin={() => {}}
            registrationUrl=""
          />
        </Space>
        <Space direction="vertical" size="small" align="center">
          <Text>Already subscribed? Sign In Here</Text>
          <Text>
            By signing up for K33 you agree to the Terms of Service. Check our
            K33’s Privacy Policy.
          </Text>
        </Space>
      </div>
    </Card>
  );
};

export default SignUpCall;
