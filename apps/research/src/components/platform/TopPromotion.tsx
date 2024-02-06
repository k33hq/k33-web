import * as React from 'react';

import { Button, Divider, Grid, Image, Typography } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';

const TopPromotion: React.FC = () => {
  const { lg, xl } = Grid.useBreakpoint();
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
            style={{ backgroundColor: '#CCB911', border: 'none' }}
          >
            Sign Up Now
          </Button>
        </Link>
      </div>
    </Link>
  );
};

export default TopPromotion;
