import * as React from 'react';
import { useRouter } from 'next/router';
import { isCookie, acceptCookie, denyCookie } from 'core';
import {
  Button,
  Switch,
  Typography,
  theme,
  Card,
  Affix,
  Row,
  Col,
  Layout,
} from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { useToken } = theme;
const { Content } = Layout;

export const variants = {
  show: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
  hide: {
    opacity: 0,
  },
};

const slideUp = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      restDelta: 0.01,
    },
  },
  hide: {
    y: 1000,
    opacity: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      restDelta: 0.01,
    },
  },
};

const CookieModal: React.FC = () => {
  const {
    token: { colorBgContainer, boxShadowSecondary, colorBorderSecondary },
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
    <AnimatePresence>
      {showCookie && (
        <Affix offsetBottom={0}>
          <motion.div
            key={router.pathname}
            variants={slideUp}
            animate={['show']}
            initial="hide"
            exit={{
              y: 1000,
              opacity: 0,
              transition: {
                type: 'spring',
                damping: 15,
                stiffness: 100,
                restDelta: 0.01,
              },
            }}
          >
            <Layout
              style={{
                display: 'flex',
                backgroundColor: colorBgContainer,
                boxShadow: '0 -16px 16px 0 rgba(0, 0, 0, 0.08)',
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
                        border: 'none',
                      }}
                      headStyle={{
                        border: 'none',
                        padding: '24px 24px 8px 24px',
                        margin: 0,
                        minHeight: 0,
                      }}
                      bodyStyle={{
                        border: 'none',
                        padding: '0px 24px 24px 24px',
                        margin: 0,
                      }}
                      actions={[
                        manage ? (
                          <Button onClick={closePrederences} type="text">
                            Back
                          </Button>
                        ) : (
                          <Button onClick={openPreferences} type="text">
                            Manage Cookies
                          </Button>
                        ),
                        manage ? (
                          <Button
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
                      <motion.div
                        key={`${manage}-key`}
                        variants={variants}
                        animate={'show'}
                        initial="hide"
                      >
                        {manage ? <CookiePreference /> : <CookieInformation />}
                      </motion.div>
                    </Card>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </motion.div>
        </Affix>
      )}
    </AnimatePresence>
  );
};

export default CookieModal;

const CookieInformation: React.FC = () => {
  const {
    token: { fontSizeLG },
  } = useToken();
  return (
    <Text
      type="secondary"
      style={{
        fontSize: fontSizeLG,
      }}
    >
      We use cookies to give you the best experience while using our platform.
      Some of them are essential, others are optional. We won’t turn them on
      unless you accept.
    </Text>
  );
};

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
