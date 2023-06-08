import * as React from 'react';
import { Layout } from 'antd';
import { ResearchFooter, ResearchHeader } from '../platform';

const { Sider } = Layout;

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleSider = () => {
    setCollapsed((state) => !state);
  };

  return (
    <Layout
      style={{
        minHeight: 1024,
      }}
    >
      <Layout>
        <ResearchHeader toggleSider={toggleSider} />
        <Layout>{children}</Layout>
        <ResearchFooter />
      </Layout>
      <Sider
        style={{
          position: 'absolute',
          height: '100vh',
          right: 0,
        }}
        breakpoint="sm"
        collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={collapsed}
      ></Sider>
    </Layout>
  );
};

export default MainLayout;
