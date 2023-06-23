import { Typography, theme } from 'antd';
import * as React from 'react';
import styles from './styles.module.scss';
import { Auth, LoginOptions } from 'platform-js';
import config from '@/firebase/config';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CallToActionCard from './CallToActionCard';

const { useToken } = theme;
const { Text, Title, Link: AntLink } = Typography;

interface SignUpCallProps {
  isReport?: boolean;
}

const SignUpCall: React.FC<SignUpCallProps> = ({ isReport = false }) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  const router = useRouter();
  return (
    <CallToActionCard>
      <div id="sign-up-header" className={styles.signupHeader}>
        <Title level={5} editable={false}>
          {isReport
            ? 'Sign up for K33 Research Pro to download the report'
            : 'Sign up for K33 Research Pro to keep reading the article'}
        </Title>
        <Text
          style={{
            fontSize: fontSizeSM,
          }}
        >
          Subscribe and get full access to all research. No credit card needed
          for free trial.
        </Text>
      </div>
      <div id="sign-up-login-options" className={styles.loginOptions}>
        <Auth
          firebaseConfig={config}
          onSuccessLogin={() => {
            router.reload();
          }}
        >
          {(props) => (
            <LoginOptions
              {...props}
              appleText="Sign Up with Apple and Start Free Trial"
              googleText="Sign Up with Google and Start Free Trial"
              microsoftText="Sign Up with Microsoft and Start Free Trial"
            />
          )}
        </Auth>
      </div>
      <div id="sign-up-footer" className={styles.signupFooter}>
        <div>
          <Text>Already subscribed? </Text>
          <Link
            href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/services/auth`}
          >
            <AntLink underline>Sign In Here</AntLink>
          </Link>
        </div>
        <div
          style={{
            fontSize: fontSizeSM,
          }}
        >
          <Typography.Text
            style={{
              fontSize: 'inherit',
            }}
          >
            {`By signing up for K33 you agree to the `}
          </Typography.Text>
          <Link
            href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/terms-and-conditions`}
          >
            <Typography.Link
              style={{
                fontSize: 'inherit',
              }}
              underline
            >
              Terms of Service
            </Typography.Link>
          </Link>
          <Typography.Text
            style={{
              fontSize: 'inherit',
            }}
          >
            {' '}
            Check our K33’s{' '}
          </Typography.Text>
          <Link href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/privacy`}>
            <Typography.Link
              style={{
                fontSize: 'inherit',
              }}
              underline
            >
              Privacy Policy.
            </Typography.Link>
          </Link>
        </div>
      </div>
    </CallToActionCard>
  );
};

export default SignUpCall;
