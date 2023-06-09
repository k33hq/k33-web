import { Auth as AuthComponent, getTitle, LoginOptions } from 'platform-js';
import { Typography } from 'antd';
import config from '@/firebase/config';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { NextPageWithLayout } from 'ui';
import { DefaultLayout } from '@/components';
import styles from './styles.module.scss';

// TODO: take on success and on failure
const SignUp: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{getTitle('Sign Up')}</title>
      </Head>
      <div id="sign-in-section" className={styles.signin}>
        <div id="title" className={styles.header}>
          <Typography.Title level={2}>Register to K33</Typography.Title>
          <div id="info">
            <Typography.Text>Already registered?</Typography.Text>
            <Link href={'/'}>
              <Typography.Link>Sign In Here</Typography.Link>
            </Link>
          </div>
        </div>
        <div id="sign-in-options" className={styles.signinOptions}>
          <AuthComponent
            onSuccessLogin={() => router.reload()}
            firebaseConfig={config}
          >
            {(props) => <LoginOptions {...props} />}
          </AuthComponent>
        </div>
      </div>
    </>
  );
};

SignUp.getLayout = function (page) {
  return <DefaultLayout footer="signing up">{page}</DefaultLayout>;
};

export default SignUp;

{
  /* <Head>
        <title>{getTitle('Auth')}</title>
      </Head>
      <Image src={logo} width={200} height={100} alt="k33-logo" /> */
}
{
  /* <AuthComponent
          firebaseConfig={config}
          onSuccessLogin={(user) => {
            router.reload();
          }}
        />
        {({ loginOption, error }) => (
          <div>
            <h1>Hello</h1>
          </div>
        )}
        */
}

{
  /* <div className="px-6 md:px-0 text-center text-small justify-center flex flex-col">
          <p>
            {`By continuing you agree to K33’s `}
            <Link
              className="underline"
              href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/terms-and-conditions`}
            >
              Terms of Service
            </Link>
            {` and acknowledge that K33’s `}
            <Link
              className="underline"
              href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/privacy`}
            >
              Privacy Policy
            </Link>
            {` applies to you.`}
          </p>
        </div> */
}
