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

// TODO: take on success and on failure
const EmailLinkSignIn: NextPageWithLayout = () => {
  const router = useRouter();
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
            onSuccessLogin={() => router.reload()}
            firebaseConfig={config}
          >
            {(props) => (
              <div
                id=""
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
              >
                <Input placeholder="Enter your email here" />
                <Button>Send Email Link</Button>
              </div>
            )}
          </AuthComponent>
        </div>
      </div>
    </>
  );
};

EmailLinkSignIn.getLayout = function (page) {
  return <DefaultLayout footer="signing in">{page}</DefaultLayout>;
};

export default EmailLinkSignIn;
