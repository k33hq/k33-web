import * as React from 'react';
import Icon, { AppleFilled } from '@ant-design/icons';
import { Button, Input, Space, Typography } from 'antd';
import { AuthFunctionalities } from './Auth';

interface LoginOptionsProps extends AuthFunctionalities {
  appleText?: string;
  microsoftText?: string;
  googleText?: string;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({
  login: { google, apple, microsoft, emailLink },
  error,
  appleText = 'Sign Up with Apple',
  microsoftText = 'Sign Up with Microsoft',
  googleText = 'Sign Up with Google',
}) => {
  const [email, setEmail] = React.useState<string>('');
  return (
    <>
      {/* <Button block icon={<AppleFilled />}>
        Sign Up with Apple
      </Button> */}
      <Button
        block
        onClick={google}
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
        {googleText}
      </Button>
      <Button block onClick={apple} icon={<AppleFilled />}>
        {appleText}
      </Button>
      <Button
        block
        onClick={microsoft}
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
        {microsoftText}
      </Button>
      <Space direction="horizontal">
        <Input
          placeholder="enter your email to get the link"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <Button type="text" onClick={() => emailLink(email)}>
          Send
        </Button>
      </Space>
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </>
  );
};

export default LoginOptions;
