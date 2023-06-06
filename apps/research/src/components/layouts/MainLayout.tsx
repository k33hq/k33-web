import * as React from 'react';
import { Layout } from 'antd';
import { ResearchHeader } from '../platform';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Layout
      style={{
        maxHeight: 1024,
      }}
    >
      <ResearchHeader />
      <Layout>{children}</Layout>
    </Layout>
  );
};

export default MainLayout;
