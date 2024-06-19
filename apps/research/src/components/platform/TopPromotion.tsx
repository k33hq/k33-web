import * as React from 'react';

import { Button, Grid, theme, Typography } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';

const { useToken } = theme;

const TopPromotion: React.FC = () => {
  const { lg, xl } = Grid.useBreakpoint();
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = useToken();
  return (
    <Link href={'/pricing'} className={styles.topPromotion}>
      <div id="top-promotion-info">
        <div>
          <Typography.Title
            style={{
              color: 'white',
              opacity: 0.85,
              margin: 0,
            }}
            level={lg ? (xl ? 3 : 4) : 5}
          >
            K33 Research <span style={{ color: '#1155CC' }}>Pro</span>
          </Typography.Title>
          <Typography.Text
            style={{
              color: 'white',
              opacity: 0.85,
              fontSize: lg ? (xl ? 18 : 16) : 14,
            }}
          >
            For Professional and Institutional Investors
          </Typography.Text>
        </div>
        <Link href={'/pricing'}>
          <Button
            size="large"
            style={{
              backgroundColor: colorPrimary,
              color: colorPrimaryBg,
              border: 'none',
            }}
          >
            Start Free Trial
          </Button>
        </Link>
      </div>
    </Link>
  );
};

export default TopPromotion;
