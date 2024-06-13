import * as React from 'react';

import { Button, Divider, Grid, Image, theme, Typography } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';

const { useToken } = theme;

const BottomPromotion: React.FC = () => {
  const { lg, xl } = Grid.useBreakpoint();
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = useToken();
  return (
    <Link href={'/pricing'} className={styles.topPromotion}>
      <div>
        <div>
          <Typography.Title
            style={{
              color: 'white',
              opacity: 0.85,
              margin: 0,
            }}
            level={lg ? (xl ? 1 : 2) : 3}
          >
            K33 Research <span style={{ color: '#1155CC' }}>Pro</span>
          </Typography.Title>
          <Typography.Text
            style={{
              color: 'white',
              opacity: 0.85,
              fontSize: lg ? (xl ? 24 : 18) : 16,
            }}
          >
            For Professional and Institutional Investors
          </Typography.Text>
        </div>
        <Link
          href={'/pricing'}
          style={{
            paddingBottom: lg ? 2 : 0,
          }}
        >
          <Button
            size="large"
            style={{
              backgroundColor: colorPrimary,
              color: colorPrimaryBg,
              border: 'none',
              ...(xl && {
                width: 180,
                height: 50,
              }),
            }}
          >
            <b>Start Free Trial</b>
          </Button>
        </Link>
      </div>
    </Link>
  );
};

export default BottomPromotion;
