import * as React from 'react';
import { Layout, Modal } from 'antd';
import { ResearchFooter, ResearchHeader } from '../platform';
import { useRouter } from 'next/router';
import { isCookie, acceptCookie, denyCookie } from 'core';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [showCookie, setCookie] = React.useState(false);

  React.useEffect(() => {
    if (!isCookie()) {
      setCookie(true);
    }
  }, [router]);

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
      <Modal
        title="20px to Top"
        style={{
          left: 0,
        }}
        open={showCookie}
        onOk={() => setCookie(false)}
        onCancel={() => setCookie(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <ResearchFooter />
    </Layout>
  );
};

export default MainLayout;
