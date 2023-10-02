import {
  Auth as AuthComponent,
  getTitle,
  LoginOptions,
  NextPageWithLayout,
} from 'platform-js';
import { Button, Input, Typography } from 'antd';
import config from '@/firebase/config';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { DefaultLayout } from '@/components';
import styles from './styles.module.scss';
import { LinkOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';

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
            sent to your email!
          </Typography.Title>
          <Typography.Text
            type="secondary"
            style={{
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Please check your email account and use the link to access our
            platfom.
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
