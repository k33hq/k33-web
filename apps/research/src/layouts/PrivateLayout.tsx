import * as React from 'react';
import { Modal, BrandButton, Loading } from 'ui';
import google from '../assets/google.svg';
import Image from 'next/image';
import { useK33App } from '@/hooks';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [state, googleLogin] = useK33App();

  return (
    <>
      {children}
      {state === 'SIGNED_OUT' ? (
        <Modal>
          <div className="flex flex-col gap-6 items-center text-center">
            <p className="md:text-heading5 text-heading7 text-label-light-secondary">
              Welcome to
            </p>
            <p className="md:text-heading3 text-heading5 text-label-light-primary">
              K33 Research
            </p>
            <p className="md:text-heading8 text-body1 text-label-light-secondary">
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
                onClick={googleLogin}
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
