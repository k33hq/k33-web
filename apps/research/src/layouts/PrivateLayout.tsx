import * as React from 'react';
import { Modal, BrandButton, Loading } from 'ui';
import { Auth, useAppState } from 'platform-js';
import config from '@/firebase/config';
import { useRouter } from 'next/router';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const state = useAppState(config);
  const router = useRouter();
  const privateStates = ['SIGNED_OUT'];

  React.useEffect(() => {
    if (state === 'UNREGISTRED') {
      window.location.href = process.env.NEXT_PUBLIC_PLATFORM_URL + '/register';
    }
  }, [state]);

  return (
    <>
      {children}
      {privateStates.includes(state) ? (
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
              <Auth
                onSuccessLogin={() => {
                  router.reload();
                }}
                firebaseConfig={config}
                registrationUrl={
                  process.env.NEXT_PUBLIC_PLATFORM_URL + '/register'
                }
              />
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default PrivateLayout;
