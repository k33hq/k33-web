import * as React from 'react';
import { Layout } from 'antd';
import { ResearchFooter, ResearchHeader } from '../platform';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: 1024,
      }}
    >
      <Layout>
        <ResearchHeader />
        {children}
        <ResearchFooter />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
