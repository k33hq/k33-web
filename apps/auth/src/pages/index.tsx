import { Auth as AuthComponent, getTitle, LoginOptions } from 'platform-js';
import { Button, Typography } from 'antd';
import config from '@/firebase/config';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { NextPageWithLayout } from 'ui';
import { DefaultLayout } from '@/components';
import styles from './styles.module.scss';

// TODO: take on success and on failure
const Auth: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{getTitle('Sign In')}</title>
      </Head>
      <div id="sign-in-section" className={styles.signin}>
        <div id="title" className={styles.header}>
          <Typography.Title level={2}>Welcome back!</Typography.Title>
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
              <LoginOptions
                {...props}
                appleText="Sign In with Apple"
                googleText="Sign In with Google"
                microsoftText="Sign In with Microsoft"
              />
            )}
          </AuthComponent>
        </div>
      </div>
    </>
  );
};

Auth.getLayout = function (page) {
  return <DefaultLayout footer="signing in">{page}</DefaultLayout>;
};

export default Auth;
