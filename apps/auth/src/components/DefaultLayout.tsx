import { Affix, Layout, Typography } from 'antd';
import * as React from 'react';
import K33Logo from '../assets/logo.svg';
import Image from 'next/image';

const { Content, Header, Footer } = Layout;

interface DefaultLayoutProps extends React.PropsWithChildren {
  footer: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, footer }) => {
  return (
    <Layout
      style={{
        minHeight: 650,
      }}
    >
      <Affix>
        <Header
          style={{
            display: 'flex',
            zIndex: 2,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image width={51} priority src={K33Logo} alt="" />
        </Header>
      </Affix>
      <Layout
        style={{
          maxWidth: 1440,
          alignSelf: 'center',
          width: '100%',
        }}
      >
        <Content>{children}</Content>
      </Layout>
      <Footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: 281, textAlign: 'center' }}>
          <Typography.Text>
            {`By ${footer} for K33 you agree to the Terms of Service. Check our
            K33’s Privacy Policy.`}
          </Typography.Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
