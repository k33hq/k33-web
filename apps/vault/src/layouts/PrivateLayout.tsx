import * as React from 'react';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import { useRouter } from 'next/router';
import { Modal } from 'ui';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const state = useAppState(config);
  const router = useRouter();

  React.useEffect(() => {
    // TODO: redirect to login
    if (state === 'SIGNED_OUT') {
      window.location.assign(
        `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/custody`
      );
    }
  }, [state, router]);

  if (state === 'LOADING')
    return (
      <Modal open={true} onClose={() => {}}>
        <div className="flex flex-col gap-6 items-center text-center">
          <p className="md:text-heading8 text-body1 text-label-light-secondary">
            Checking Authentication and Vault Registration
          </p>
        </div>
      </Modal>
    );

  return <>{children}</>;
};

export default PrivateLayout;
