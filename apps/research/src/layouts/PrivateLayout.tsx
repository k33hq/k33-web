import config from '@/firebase/config';
import * as React from 'react';
import { AppStates, getAppState, googleLogin, init, isLoggedIn } from 'core';
import { Modal, BrandButton, Loading } from 'ui';
import google from '../assets/google.svg';
import Image from 'next/image';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [state, setState] = React.useState<AppStates>('LOADING');

  React.useEffect(() => {
    init(config);
  }, []);

  React.useEffect(() => {
    if (isLoggedIn()) {
      setState('REGISTRED');
    } else {
      setState('SIGNED_OUT');
    }
  }, []);

  const handleGoogleLogin = () => {
    googleLogin(
      (user) => {
        setState('REGISTRED');
      },
      (err) => console.log(err)
    );
  };

  return (
    <>
      {children}
      {state === 'SIGNED_OUT' ? (
        <Modal>
          <div className="flex flex-col gap-6 items-center text-center">
            <p className="text-heading5 text-label-light-secondary">
              Welcome to
            </p>
            <p className="text-heading3 text-label-light-primary">
              K33 Research
            </p>
            <p className="text-heading8 text-label-light-secondary">
              Sing in for full access to our research archive of articles,
              reports and analysis, and become an expert!
            </p>
            <div id="login-mechanism" className="flex flex-col pt-10 w-full">
              <BrandButton
                logo={
                  <Image
                    src={google}
                    width={22}
                    height={22}
                    alt="google logo"
                  />
                }
                label="Sign in with Google"
                onClick={handleGoogleLogin}
              />
            </div>
          </div>
        </Modal>
      ) : null}
      {state === 'LOADING' ? <Loading /> : null}
    </>
  );
};

export default PrivateLayout;
