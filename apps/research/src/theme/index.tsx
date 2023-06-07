import React from 'react';
import { ConfigProvider } from 'antd';

const withTheme = (node: JSX.Element) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#999999',
        colorTextSecondary: '#000000a6',
      },
      components: {
        Layout: {
          colorBgBody: '#ffffff',
          colorBgHeader: '#141414',
        },
      },
    }}
  >
    {node}
  </ConfigProvider>
);

export default withTheme;
