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
import { getUserInformation, logout } from 'core';

const { Header } = Layout;
const { useBreakpoint } = Grid;
const { useToken } = theme;

interface ResearchHeaderProps {}

const ResearchHeader: React.FC<ResearchHeaderProps> = () => {
  const { md } = useBreakpoint();
  const [open, setOpen] = React.useState(false);
  // TODO: extract this in global state
  const [user, setUser] = React.useState<{
    url: string | null;
    email: string | null;
  }>({ url: null, email: null });
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
    getUserInformation((user) => {
      if (user) {
        setUser({ url: user.photoURL, email: user.email });
      }
    });
  }, []);

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
              <Row wrap={false} align="middle">
                <Col span={22} offset={1}>
                  <Row
                    wrap={false}
                    gutter={16}
                    style={{ paddingLeft: 8, paddingRight: 8 }}
                  >
                    <Col
                      flex={1}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 0,
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
                            defaultSelectedKeys={['home']}
                            selectedKeys={
                              router.pathname.split('/').filter((v) => v != '')
                                .length > 0
                                ? router.pathname
                                    .split('/')
                                    .filter((v) => v != '')
                                : ['home']
                            }
                            items={appStructure.navigation.map(
                              ({ key, label, url }) => ({
                                key,
                                label,
                                onClick: () => {
                                  if (
                                    !(typeof window === undefined) &&
                                    !url.includes('https://')
                                  ) {
                                    window.history.pushState(
                                      null,
                                      '',
                                      `/research${url}`
                                    );
                                    window.location.reload();
                                  } else {
                                    window.location.href = url;
                                  }
                                },
                              })
                            )}
                          />
                        }
                      </Col>
                    )}
                    <Col
                      style={{
                        paddingRight: 0,
                      }}
                    >
                      {state === 'SIGNED_OUT' ? (
                        <Link
                          href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
                        >
                          <Button
                            style={{
                              boxShadow: 'none',
                            }}
                            type="primary"
                          >
                            Sign In
                          </Button>
                        </Link>
                      ) : (
                        <Dropdown placement="bottomLeft" menu={{ items }}>
                          <Avatar
                            {...(!user.url && {
                              style: {
                                backgroundColor: colorPrimary,
                              },
                            })}
                            src={user.url}
                            icon={!user.url && <UserOutlined />}
                            onClick={(e) => e?.preventDefault()}
                          />
                        </Dropdown>
                      )}
                    </Col>
                    <Col
                      md={0}
                      style={{
                        paddingRight: 0,
                        margin: 0,
                      }}
                    >
                      {!md && (
                        <Button
                          onClick={openDrawer}
                          type="text"
                          icon={<MenuOutlined />}
                        />
                      )}
                    </Col>
                  </Row>
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
          selectedKeys={
            router.pathname.split('/').filter((v) => v != '').length > 0
              ? router.pathname.split('/').filter((v) => v != '')
              : ['home']
          }
          items={appStructure.navigation.map(({ key, label, url }) => ({
            key,
            label,
            onClick: () => {
              if (!(typeof window === undefined) && !url.includes('https://')) {
                window.history.pushState(null, '', `/research${url}`);
                window.location.reload();
              } else {
                window.location.href = url;
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
    <Link
      href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
      }}
    >
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
    </Link>
  );
};
