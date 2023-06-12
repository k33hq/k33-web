import { PageTabs } from '@/types';
import { theme, Layout, Row, Col, Tabs, Typography } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';

const { useToken } = theme;
const { Title } = Typography;

interface TabLayoutProps extends React.PropsWithChildren {
  title: string;
  tabs: PageTabs;
}

const TabLayout: React.FC<TabLayoutProps> = ({ children, title, tabs }) => {
  const {
    token: { colorBgContainer },
  } = useToken();
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <section
          id="page-title"
          style={{
            maxWidth: 1440,
            alignSelf: 'center',
            width: '100%',
          }}
        >
          <Row>
            <Col span={22} offset={1}>
              <div id="page-title" className={styles.pageTitle}>
                <Title
                  level={3}
                  style={{
                    margin: 0,
                  }}
                >
                  {title}
                </Title>
              </div>
              <Tabs
                tabBarStyle={{
                  margin: 0,
                }}
                type="card"
                items={tabs}
              />
            </Col>
          </Row>
        </section>
      </div>
      <Layout
        style={{
          display: 'flex',
          backgroundColor: colorBgContainer,
        }}
      >
        <section
          id="page-title"
          style={{
            maxWidth: 1440,
            alignSelf: 'center',
            width: '100%',
          }}
        >
          <Row>
            <Col span={22} offset={1}>
              {children}
            </Col>
          </Row>
        </section>
      </Layout>
    </>
  );
};

export default TabLayout;
