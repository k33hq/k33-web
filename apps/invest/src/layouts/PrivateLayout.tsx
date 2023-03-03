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
    if (state === 'UNREGISTRED') {
      window.location.href = process.env.NEXT_PUBLIC_PLATFORM_URL + '/register';
    }

    // TODO: redirect to login
    if (state === 'SIGNED_OUT') {
      router.push('/');
    }
  }, [state, router]);

  if (state === 'LOADING')
    return (
      <Modal open={true} onClose={() => {}}>
        <div className="flex flex-col gap-6 items-center text-center">
          <p className="md:text-heading8 text-body1 text-label-light-secondary">
            Checking Authentication and Fund Registration
          </p>
        </div>
      </Modal>
    );

  return <>{children}</>;
};

export default PrivateLayout;
