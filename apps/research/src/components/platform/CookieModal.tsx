import * as React from 'react';
import { useRouter } from 'next/router';
import { isCookie, acceptCookie, denyCookie } from 'core';

import { Button, Switch, Modal, Typography, theme, Grid } from 'antd';

import styles from './styles.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';
import { isBrowser } from '@/utils';

const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const CookieModal: React.FC = () => {
  const router = useRouter();
  const [showCookie, setCookie] = React.useState(false);
  const [manage, setManage] = React.useState(false);
  const size = useSize(isBrowser() ? document.querySelector('body') : null);
  const { md } = useBreakpoint();

  React.useEffect(() => {
    if (!isCookie()) {
      setCookie(true);
    }
  }, [router]);

  const openPreferences = () => setManage(true);
  const closePrederences = () => setManage(false);

  return (
    <Modal
      getContainer={false}
      title="Cookies Settings"
      mask={false}
      open={showCookie}
      style={{
        top: size?.height! - 600,
      }}
      closable={false}
      footer={[
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
            onClick={acceptCookie}
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
            onClick={acceptCookie}
          >
            Allow Cookies
          </Button>
        ),
      ]}
    >
      {manage ? <CookiePreference /> : <CookieInformation />}
    </Modal>
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
