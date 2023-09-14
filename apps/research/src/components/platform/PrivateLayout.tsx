import * as React from 'react';
import TabLayout, { TabLayoutProps } from '../layouts/TabLayout';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import { SignUpCall } from '../article';
import { NextSeo } from 'next-seo';

interface PrivateLayoutProps extends React.PropsWithChildren, TabLayoutProps {
  seoTitle: string;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({
  children,
  seoTitle,
  ...tabLayoutProps
}) => {
  const state = useAppState(config);
  return (
    <>
      <NextSeo title={seoTitle} />
      <TabLayout {...tabLayoutProps}>
        {state === 'SIGNED_OUT' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SignUpCall />
          </div>
        ) : (
          children
        )}
      </TabLayout>
    </>
  );
};

export default PrivateLayout;
