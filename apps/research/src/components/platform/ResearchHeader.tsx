import {
  Affix,
  Layout,
  Menu,
  Grid,
  Button,
  Row,
  Col,
  Typography,
  theme,
  ConfigProvider,
} from 'antd';
import styles from './styles.module.scss';
import { appStructure } from '@/config';
import { MenuOutlined } from '@ant-design/icons';
import * as React from 'react';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface ResearchHeaderProps {
  toggleSider: () => void;
}

const ResearchHeader: React.FC<ResearchHeaderProps> = ({ toggleSider }) => {
  const { md } = useBreakpoint();

  return (
    <Affix>
      <Header className={styles.header}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#999999',
              colorBgBase: '#141414',
              colorText: '#FFFFFF',
            },
          }}
        >
          <div id="header-content">
            <Row gutter={32}>
              <Col>
                <Typography.Text>Logo</Typography.Text>
              </Col>
              <Col flex={1}>
                {md && (
                  <Menu
                    selectable={false}
                    mode="horizontal"
                    style={{
                      borderBottom: 0,
                    }}
                    disabledOverflow
                    items={appStructure.navigation.map(({ key, label }) => ({
                      key,
                      label,
                    }))}
                  />
                )}
              </Col>
              <Col>
                <Button>Sign In</Button>
              </Col>
              <Col>
                {!md && (
                  <Button
                    onClick={toggleSider}
                    type="text"
                    icon={<MenuOutlined />}
                  />
                )}
              </Col>
            </Row>
          </div>
        </ConfigProvider>
      </Header>
    </Affix>
  );
};

export default ResearchHeader;
