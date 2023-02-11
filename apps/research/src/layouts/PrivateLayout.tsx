import * as React from 'react';
import { Modal, BrandButton, Loading } from 'ui';
import { useK33App } from '@/hooks';
import { FcGoogle } from 'react-icons/fc';

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
                logo={<FcGoogle width={22} height={22} />}
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
