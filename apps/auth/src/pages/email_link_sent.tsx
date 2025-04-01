import { getTitle, NextPageWithLayout } from 'platform-js';
import { Typography } from 'antd';
import Head from 'next/head';
import { DefaultLayout } from '@/components';
import styles from './styles.module.scss';
import { MailOutlined } from '@ant-design/icons';

// TODO: take on success and on failure
const EmailLinkSignIn: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('Sign In')}</title>
      </Head>
      <div id="sign-in-section" className={styles.signin}>
        <div id="title" className={styles.header}>
          <MailOutlined style={{ fontSize: '64px' }} />
          <Typography.Title style={{ margin: 0 }} level={1}>
            Email Link
          </Typography.Title>
          <Typography.Title style={{ marginBottom: 8, marginTop: 0 }} level={1}>
            sent to your inbox!
          </Typography.Title>
          <Typography.Text
            type="secondary"
            style={{
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Please check your inbox and use the link to access our platform.
            Remember to check your spam folder.
          </Typography.Text>
        </div>
      </div>
    </>
  );
};

EmailLinkSignIn.getLayout = function (page) {
  return <DefaultLayout footer="signing in">{page}</DefaultLayout>;
};

export default EmailLinkSignIn;
