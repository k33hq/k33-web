import { Button, Col, Layout, Menu, Row, theme } from 'antd';

const { Header, Content } = Layout;

const ResearchHeader: React.FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Header
      style={{
        position: 'sticky',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Content style={{ maxWidth: 1440 }}>
        <Row align="middle">
          <Col>Logo Project</Col>
          <Col flex={2}>
            <Menu
              style={{
                backgroundColor: colorPrimary,
              }}
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: 'home',
                  label: 'Home',
                },
                { key: 'market-insights', label: 'Market Insights' },
                { key: 'token-valuation', label: 'Token Valuation' },
                { key: 'industry-insight', label: 'Industry Insight' },
              ]}
            />
          </Col>
          <Col>
            <Button>Sign In</Button>
          </Col>
        </Row>
      </Content>
    </Header>
  );
};

export default ResearchHeader;
