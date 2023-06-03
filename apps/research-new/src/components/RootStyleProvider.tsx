'use client';

import * as React from 'react';
import { ConfigProvider, theme } from 'antd';
import RootStyleRegistry from './RootStyleRegistry';

const { defaultAlgorithm } = theme;

export const RootStyleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#141414',
          colorText: '#ffffff',
        },
        components: {
          Layout: {
            colorBgBody: '#fffff',
            colorBgHeader: '#141414',
          },
        },
        hashed: true,
        algorithm: defaultAlgorithm,
      }}
    >
      <RootStyleRegistry>{children}</RootStyleRegistry>
    </ConfigProvider>
  );
};

export default RootStyleProvider;
