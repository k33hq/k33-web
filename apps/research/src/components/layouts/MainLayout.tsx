import * as React from 'react';
import { Layout } from 'antd';
import { CookieModal, ResearchFooter, ResearchHeader } from '../platform';

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
    <>
      <Layout
        style={{
          minHeight: 1024,
          backgroundColor: 'white',
        }}
      >
        <ResearchHeader />
        <Layout>{children}</Layout>
        <ResearchFooter />
        <CookieModal />
      </Layout>
    </>
  );
};

export default MainLayout;
