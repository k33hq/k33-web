import { Auth as AuthComponent, getTitle } from 'platform-js';
import { Button, Typography } from 'antd';
import config from '@/firebase/config';
import Icon, { AppleFilled, GoogleCircleFilled } from '@ant-design/icons';
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
            <Typography.Link>Sign Up Here</Typography.Link>
          </div>
        </div>
        <div id="sign-in-options" className={styles.signinOptions}>
          <Button block icon={<AppleFilled />}>
            Sign In with Apple
          </Button>
          <Button
            block
            icon={
              <Icon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.01584 10.9538L4.25806 9.23917C4.12985 8.84977 4.06052 8.43318 4.06052 7.99986C4.06052 7.56653 4.12985 7.14995 4.25806 6.76054L2.01584 5.0459C1.57852 5.935 1.33325 6.9374 1.33325 7.99986C1.33325 9.06232 1.57852 10.0647 2.01584 10.9538Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M4.25809 6.7606C4.77542 5.1893 6.25145 4.06052 7.99995 4.06052C8.93934 4.06052 9.78783 4.39386 10.4545 4.93931L12.3939 2.99992C11.2121 1.96962 9.69692 1.33325 7.99995 1.33325C5.36544 1.33325 3.10025 2.84132 2.01587 5.04596L4.25809 6.7606Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M7.99987 14.6665C5.36463 14.6665 3.09892 13.1576 2.01489 10.952L4.2562 9.23364C4.77188 10.8078 6.24933 11.9392 7.99987 11.9392C8.85647 11.9392 9.61545 11.7375 10.2165 11.3582L12.3452 13.0062C11.1799 14.0896 9.62595 14.6665 7.99987 14.6665Z"
                    fill="#34A853"
                  />
                  <path
                    d="M8 6.78784H14.2121C14.303 7.18178 14.3636 7.60602 14.3636 7.99996C14.3636 10.1728 13.5687 11.8688 12.3453 13.0063L10.2166 11.3583C10.9126 10.9191 11.3969 10.2417 11.5758 9.3636H8V6.78784Z"
                    fill="#4285F4"
                  />
                </svg>
              </Icon>
            }
          >
            Sign In with Google
          </Button>
          <Button
            block
            icon={
              <Icon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.64904 1.33325H1.33325V7.64904H7.64904V1.33325Z"
                    fill="#F25022"
                  />
                  <path
                    d="M7.64904 8.35083H1.33325V14.6666H7.64904V8.35083Z"
                    fill="#00A4EF"
                  />
                  <path
                    d="M14.6666 1.33325H8.35083V7.64904H14.6666V1.33325Z"
                    fill="#7FBA00"
                  />
                  <path
                    d="M14.6666 8.35083H8.35083V14.6666H14.6666V8.35083Z"
                    fill="#FFB900"
                  />
                </svg>
              </Icon>
            }
          >
            Sign In with Microsoft
          </Button>
        </div>
      </div>
    </>
  );
};

Auth.getLayout = function (page) {
  return <DefaultLayout footer="signing in">{page}</DefaultLayout>;
};

export default Auth;

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
