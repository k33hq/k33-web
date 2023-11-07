import * as React from 'react';

import { Button, Divider, Grid, Image, Typography } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';

const BottomPromotion: React.FC = () => {
  const { lg, xl } = Grid.useBreakpoint();
  return (
    <Link href={'/pricing'} className={styles.topPromotion}>
      <div
        id="top-promotion-info"
        style={{
          backgroundColor: '#202328',
        }}
      >
        <div>
          <Typography.Title
            style={{
              color: 'white',
              opacity: 0.85,
              margin: 0,
            }}
            level={lg ? (xl ? 1 : 2) : 3}
          >
            Digital Assets Research
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
        <Link href={'/pricing'}>
          <Button size="large">Sign Up Now</Button>
        </Link>
      </div>
      <div />
    </Link>
  );
};

export default BottomPromotion;
