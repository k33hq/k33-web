import { Card, theme } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';

const { useToken } = theme;

const CallToActionCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgLayout },
  } = useToken();
  return (
    <Card
      style={{
        backgroundColor: colorBgLayout,
        width: '100%',
      }}
    >
      <div id="article-call-to-action" className={styles.callToAction}>
        {children}
      </div>
    </Card>
  );
};

export default CallToActionCard;
