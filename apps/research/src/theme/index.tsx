import React from 'react';
import { ConfigProvider } from 'antd';

const withTheme = (node: JSX.Element) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#a54242',
        colorPrimaryBg: '#f5f6fc',
        colorTextDescription: '#000000a6',
        colorLink: '#777777',
      },
      components: {
        Layout: {
          colorBgContainer: '#ffffff',
          headerBg: '#141414',
        },
      },
    }}
  >
    {node}
  </ConfigProvider>
);

export default withTheme;
