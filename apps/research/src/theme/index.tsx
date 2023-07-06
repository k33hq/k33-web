import React from 'react';
import { ConfigProvider } from 'antd';

const withTheme = (node: JSX.Element) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#999999',
        colorTextDescription: '#000000a6',
        colorLink: '#777777',
      },
      components: {
        Layout: {
          colorBgContainer: '#ffffff',
          colorBgHeader: '#141414',
        },
      },
    }}
  >
    {node}
  </ConfigProvider>
);

export default withTheme;
