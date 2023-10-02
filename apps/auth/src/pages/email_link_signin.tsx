import {
  Auth as AuthComponent,
  getTitle,
  NextPageWithLayout,
  useAppState,
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
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// TODO: take on success and on failure
const EmailLinkSignIn: NextPageWithLayout = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const [error, setError] = useState<null | string>(null);

  return (
    <>
      <Head>
        <title>{getTitle('Sign In')}</title>
      </Head>
      <div id="sign-in-section" className={styles.signin}>
        <div id="title" className={styles.header}>
          <Typography.Title level={2}>Email Link Sign In</Typography.Title>
          <div id="info">
            <Typography.Text>Don’t have an account yet?</Typography.Text>
            <Link href={'/signup'}>
              <Typography.Link>Sign Up Here</Typography.Link>
            </Link>
          </div>
        </div>
        <div id="sign-in-options" className={styles.signinOptions}>
          <AuthComponent
            redirectUrl={(router.query.redirect as string) ?? undefined}
            onSuccessLogin={() => router.reload()}
            firebaseConfig={config}
          >
            {({ error: authError, login: { emailLink } }) => (
              <div
                id=""
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 24,
                }}
              >
                <Input
                  value={email}
                  onFocus={(e) => setError(null)}
                  prefix={<MailOutlined />}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email here"
                />
                <Button
                  type="primary"
                  icon={<LinkOutlined />}
                  onClick={() => {
                    if (email.match(validRegex)) {
                      emailLink(email);
                      router.push('/email_link_sent');
                    } else {
                      setError('invalid email');
                    }
                  }}
                >
                  Send Email Link
                </Button>
                {authError && (
                  <Typography.Text type="danger">{authError}</Typography.Text>
                )}
              </div>
            )}
          </AuthComponent>
          {error && (
            <Typography.Paragraph
              type="danger"
              style={{
                alignSelf: 'center',
              }}
            >
              {error}
            </Typography.Paragraph>
          )}
        </div>
      </div>
    </>
  );
};

EmailLinkSignIn.getLayout = function (page) {
  return <DefaultLayout footer="signing in">{page}</DefaultLayout>;
};

export default EmailLinkSignIn;
