import * as React from 'react';
import { useRouter } from 'next/router';
import { isCookie, acceptCookie, denyCookie } from 'core';

import {
  Button,
  Switch,
  Modal,
  Typography,
  theme,
  Grid,
  Card,
  Affix,
  Row,
  Col,
  Layout,
} from 'antd';

import styles from './styles.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';
import { isBrowser } from '@/utils';

const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Content } = Layout;

const CookieModal: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = useToken();
  const router = useRouter();
  const [showCookie, setCookie] = React.useState(false);
  const [manage, setManage] = React.useState(false);

  React.useEffect(() => {
    if (!isCookie()) {
      setCookie(true);
    }
  }, [router]);

  const openPreferences = () => setManage(true);
  const closePrederences = () => setManage(false);

  const closeCookie = () => {
    setCookie(false);
    acceptCookie();
  };

  return (
    <>
      {showCookie && (
        <Affix offsetBottom={10}>
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
              }}
            >
              <Row>
                <Col span={22} offset={1}>
                  <Card
                    title="Cookies Settings"
                    style={{
                      position: 'static',
                      bottom: 0,
                    }}
                    actions={[
                      manage ? (
                        <Button
                          size="large"
                          onClick={closePrederences}
                          type="text"
                        >
                          Back
                        </Button>
                      ) : (
                        <Button
                          onClick={openPreferences}
                          type="text"
                          size="large"
                        >
                          Manage Cookies
                        </Button>
                      ),
                      manage ? (
                        <Button
                          size="large"
                          style={{
                            boxShadow: 'none',
                          }}
                          onClick={closeCookie}
                          key="submit"
                          type="primary"
                        >
                          Accept
                        </Button>
                      ) : (
                        <Button
                          size="large"
                          style={{
                            boxShadow: 'none',
                          }}
                          key="submit"
                          type="primary"
                          onClick={closeCookie}
                        >
                          Allow Cookies
                        </Button>
                      ),
                    ]}
                  >
                    {manage ? <CookiePreference /> : <CookieInformation />}
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Affix>
      )}
    </>
  );
};

export default CookieModal;

const CookieInformation: React.FC = () => (
  <Text type="secondary">
    We use cookies in order to give you the best experience possible while using
    our platform. Some of them are essential, others are optional. We won’t turn
    them on unless you accept.
  </Text>
);

const CookiePreference: React.FC = () => {
  const {
    token: { fontSizeSM },
  } = useToken();
  return (
    <div id="cookie-preference" className={styles.cookiePreference}>
      <div id="strictly-necessary">
        <div id="strictly-necessary-information">
          <Text strong type="secondary">
            Strictly Necessary
          </Text>
          <Text
            type="secondary"
            style={{
              fontSize: fontSizeSM,
            }}
          >
            These cookies are necessary for our platform to function properly
            and can’t be disabled.
          </Text>
        </div>
        <Switch defaultChecked disabled />
      </div>
      <div id="product-development">
        <div id="product-development-information">
          <Text strong type="secondary">
            Product Development
          </Text>
          <Text
            type="secondary"
            style={{
              fontSize: fontSizeSM,
            }}
          >
            These cookies help us to understand the use of our platform helping
            us making it better.
          </Text>
        </div>
        <Switch
          defaultChecked
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </div>
    </div>
  );
};
