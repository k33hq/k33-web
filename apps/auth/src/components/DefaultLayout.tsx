import { Affix, Grid, Layout, Typography } from 'antd';
import * as React from 'react';
import K33Logo from '../assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const { Content, Header, Footer } = Layout;

const { useBreakpoint } = Grid;

interface DefaultLayoutProps extends React.PropsWithChildren {
  footer: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, footer }) => {
  const { md } = useBreakpoint();
  return (
    <Layout
      style={{
        minHeight: md ? 1000 : 650,
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
            cursor: 'pointer',
          }}
          onClick={() => {
            window.location.href = `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}`;
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
        <div style={{ maxWidth: 300, textAlign: 'center' }}>
          <Typography.Text>
            {`By ${footer} for K33 you agree to the `}
          </Typography.Text>
          <Link
            href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/terms-and-conditions`}
          >
            <Typography.Link underline>Terms of Service</Typography.Link>
          </Link>
          <Typography.Text> Check our K33’s </Typography.Text>
          <Link href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/privacy`}>
            <Typography.Link underline>Privacy Policy.</Typography.Link>
          </Link>
        </div>
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
