import * as React from 'react';
import { Modal, BrandButton, Loading } from 'ui';
import { Auth, useAppState } from 'platform-js';
import config from '@/firebase/config';
import { useRouter } from 'next/router';
import { register } from 'core';
import Link from 'next/link';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const state = useAppState(config);
  const router = useRouter();
  const privateStates = ['SIGNED_OUT'];

  React.useEffect(() => {
    if (state === 'UNREGISTRED') {
      register();
    }
  }, [state]);

  return (
    <>
      {children}
      {privateStates.includes(state) ? (
        <Modal open={privateStates.includes(state)} onClose={() => {}}>
          <div className="flex flex-col gap-6 items-center text-center">
            <p className="md:text-heading5 text-heading7 text-label-light-secondary">
              Welcome to
            </p>
            <p className="md:text-heading3 text-heading5 text-label-light-primary">
              K33 Research
            </p>
            <p className="md:text-heading8 text-body1 text-label-light-secondary">
              Sign in for full access to our research archive of articles,
              reports and analysis, and become an expert!
            </p>
            <div id="login-mechanism" className="flex flex-col pt-10 w-full">
              <Auth
                onSuccessLogin={() => {
                  router.reload();
                }}
                firebaseConfig={config}
                registrationUrl={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/register`}
              />
              <div className="px-6 md:px-0 text-center text-small justify-center flex flex-col">
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
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default PrivateLayout;
