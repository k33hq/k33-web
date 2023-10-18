import { Navigations } from '@/types';
import { theme, Layout, Row, Col, Tabs, Typography, Space, Grid } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

const { useToken } = theme;
const { Title, Text } = Typography;

export interface TabLayoutProps extends React.PropsWithChildren {
  title: string;
  description?: string;
  tabs: Navigations;
  activeKey: string;
  image?: string;
  type?: 'primary' | 'secondary';
}

const TabLayout: React.FC<TabLayoutProps> = ({
  children,
  title,
  tabs,
  activeKey,
  description,
  image,
  type = 'primary',
}) => {
  const {
    token: { colorBgContainer },
  } = useToken();

  const { xl } = Grid.useBreakpoint();

  const router = useRouter();
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          ...(image && {
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }),
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
                <Space direction="vertical" size="small">
                  <Title
                    level={xl ? 2 : 3}
                    style={{
                      margin: 0,
                      ...(type === 'secondary' && {
                        color: 'white',
                        opacity: 0.85,
                      }),
                    }}
                  >
                    {title}
                  </Title>
                  {description && (
                    <Text
                      style={{
                        ...(type === 'secondary' && {
                          color: 'white',
                          opacity: 0.85,
                        }),
                      }}
                    >
                      {description}
                    </Text>
                  )}
                </Space>
              </div>
              {tabs.length > 0 && (
                <Tabs
                  tabBarStyle={{
                    margin: 0,
                  }}
                  type="card"
                  onTabClick={(key, event) => {
                    router.push(key);
                  }}
                  activeKey={activeKey}
                  items={tabs.map(({ label, url }) => ({ key: url, label }))}
                />
              )}
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
            <Col span={22} offset={1} className="default-body">
              {children}
            </Col>
          </Row>
        </section>
      </Layout>
    </>
  );
};

export default TabLayout;
