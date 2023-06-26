import * as React from 'react';
import { Layout, theme, Row, Col } from 'antd';

const { Content } = Layout;
const { useToken } = theme;

interface SimpleLayoutProps extends React.PropsWithChildren {}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, colorPrimaryText },
  } = useToken();
  return (
    <Layout
      style={{
        display: 'flex',
        backgroundColor: colorBgContainer,
      }}
    >
      <Content
        id="page-title"
        style={{
          maxWidth: 1440,
          alignSelf: 'center',
          width: '100%',
          color: colorPrimaryText,
        }}
      >
        <Row>
          <Col span={22} offset={1}>
            {children}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SimpleLayout;
