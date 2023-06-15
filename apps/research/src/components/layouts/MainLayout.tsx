import * as React from 'react';
import { Layout } from 'antd';
import { ResearchFooter, ResearchHeader } from '../platform';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  React.useEffect(() => {
    (function () {
      window.onpageshow = function (event) {
        if (event.persisted) {
          window.location.reload();
        }
      };
    })();
  }, []);

  return (
    <Layout
      style={{
        minHeight: 1024,
      }}
    >
      <ResearchHeader />
      <Layout>{children}</Layout>
      <ResearchFooter />
    </Layout>
  );
};

export default MainLayout;
