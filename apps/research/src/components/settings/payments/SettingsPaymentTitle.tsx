import * as React from 'react';
import { Typography } from 'antd';
import styles from './styles.module.scss';

const { Title, Text } = Typography;

const SettingsPaymentTitle: React.FC = () => {
  return (
    <div id="settings-title" className={styles.settingsPaymentTitle}>
      <Title
        level={4}
        style={{
          margin: 0,
        }}
      >
        Your payment methods
      </Title>
      <Text type="secondary">
        Here you can have an overview of you current plan and your payment
        methods.
      </Text>
    </div>
  );
};

export default SettingsPaymentTitle;
