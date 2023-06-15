import {
  Affix,
  Layout,
  Menu,
  Grid,
  Button,
  Row,
  Col,
  ConfigProvider,
  Drawer,
  Avatar,
  Dropdown,
  theme,
} from 'antd';
import type { MenuProps } from 'antd';
import styles from './styles.module.scss';
import { appStructure } from '@/config';
import {
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import * as React from 'react';
import Image from 'next/image';
import companyLogo from '../../assets/k33.svg';
import researchLogo from '../../assets/research.svg';
import { useAppState } from 'platform-js';
import firebaseConfig from '@/firebase/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from 'core';

const { Header } = Layout;
const { useBreakpoint } = Grid;
const { useToken } = theme;

interface ResearchHeaderProps {}

const ResearchHeader: React.FC<ResearchHeaderProps> = () => {
  const { md } = useBreakpoint();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const {
    token: { colorPrimary },
  } = useToken();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const state = useAppState(firebaseConfig);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => router.push('/settings'),
    },
    {
      key: '2',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () =>
        logout(
          () => router.reload(),
          (err) => {}
        ),
    },
  ];

  React.useEffect(() => {
    console.log();
  }, [router]);

  return (
    <>
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
              <Row gutter={16} wrap={false}>
                <Col
                  flex={1}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <AppLogo />
                </Col>
                {md && (
                  <Col flex={2}>
                    {
                      <Menu
                        selectable={false}
                        mode="horizontal"
                        style={{
                          borderBottom: 0,
                        }}
                        selectedKeys={router.pathname.split('/')}
                        items={appStructure.navigation.map(
                          ({ key, label, url }) => ({
                            key,
                            label,
                            onClick: () => {
                              if (!(typeof window === undefined)) {
                                window.history.pushState(
                                  null,
                                  '',
                                  `/research${url}`
                                );
                                window.location.reload();
                              }
                            },
                          })
                        )}
                      />
                    }
                  </Col>
                )}
                <Col>
                  {state === 'SIGNED_OUT' ? (
                    <Link
                      href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
                    >
                      <Button type="primary">Sign In</Button>
                    </Link>
                  ) : (
                    <Dropdown menu={{ items }}>
                      <Avatar
                        style={{
                          backgroundColor: colorPrimary,
                        }}
                        onClick={(e) => e?.preventDefault()}
                        icon={<UserOutlined />}
                      />
                    </Dropdown>
                  )}
                </Col>
                <Col>
                  {!md && (
                    <Button
                      onClick={openDrawer}
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
      <Drawer width={200} placement="right" onClose={closeDrawer} open={open}>
        <Menu
          selectable={false}
          style={{
            width: 200,
          }}
          selectedKeys={router.pathname.split('/')}
          items={appStructure.navigation.map(({ key, label, url }) => ({
            key,
            label,
            onClick: () => {
              if (!(typeof window === undefined)) {
                window.history.pushState(null, '', `/research${url}`);
                window.location.reload();
              }
            },
          }))}
        />
      </Drawer>
    </>
  );
};

export default ResearchHeader;

const AppLogo: React.FC = () => {
  return (
    <>
      <Image width={51} priority src={companyLogo} alt="company-logo" />
      <Image
        priority
        width={98}
        style={{
          minWidth: 50,
        }}
        src={researchLogo}
        alt="research-logo"
      />
    </>
  );
};
