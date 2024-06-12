import { Navigations } from '@/types';
import {
  theme,
  Layout,
  Row,
  Col,
  Tabs,
  Typography,
  Space,
  Grid,
  Button,
} from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { sectionKeys } from '@/utils';
import { appStructure } from '@/config';
import { useProductInfo } from '@/hooks';

const { useToken } = theme;
const { Title, Text } = Typography;

export interface TabLayoutProps extends React.PropsWithChildren {
  title: string;
  description?: string;
  tabs: Navigations;
  activeKey: string;
  image?: string;
  type?: 'primary' | 'secondary';
  isButtonPrimary?: boolean;
  showSubscribeButton?: boolean;
  sectionName?: string;
}

const TabLayout: React.FC<TabLayoutProps> = ({
  children,
  title,
  tabs,
  activeKey,
  description,
  image,
  type = 'primary',
  isButtonPrimary = false,
  showSubscribeButton = false,
  sectionName = 'pro',
}) => {
  const {
    token: { colorBgContainer, colorPrimary, colorPrimaryBg },
  } = useToken();

  const { md, xl } = Grid.useBreakpoint();
  const productKey = sectionKeys[sectionName] ?? 'pro';

  const { productStatus } = useProductInfo(
    appStructure.payments[productKey].productId
  );

  const { productStatus: proProductStatus, appState } = useProductInfo(
    appStructure.payments.pro.productId
  );

  const getSubscribeButton = () => {
    if (
      showSubscribeButton &&
      productStatus.state !== 'active' &&
      proProductStatus.state !== 'active'
    ) {
      return (
        <Link href={'/pricing'}>
          <Button
            size="large"
            style={{
              background: colorPrimary,
              ...(xl && {
                width: 240,
                height: 50,
              }),
              border: 'none',
              color: colorPrimaryBg,
            }}
          >
            Subscribe
          </Button>
        </Link>
      );
    }

    return null;
  };

  const router = useRouter();
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          ...(image && {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            brightness: 0.3,
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
                <Space
                  direction={xl ? 'horizontal' : 'vertical'}
                  size={'large'}
                >
                  <div style={{ maxWidth: 210 }}>
                    <Title
                      level={xl ? 1 : 3}
                      style={{
                        margin: 0,
                        color: type === 'primary' ? 'white' : 'black',
                        fontWeight: 800,
                      }}
                    >
                      {title}
                    </Title>
                  </div>
                  <div style={{ maxWidth: 300 }}>
                    {description && (
                      <Text
                        style={{
                          color: 'white',
                          fontSize: xl ? 18 : 16,
                        }}
                      >
                        {description}
                      </Text>
                    )}
                  </div>
                </Space>

                {getSubscribeButton()}
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
