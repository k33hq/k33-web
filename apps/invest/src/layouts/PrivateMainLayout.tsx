import * as React from 'react';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import { useRouter } from 'next/router';
import MainLayout from './MainLayout';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateMainLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const state = useAppState(config);
  const router = useRouter();

  React.useEffect(() => {
    if (state === 'UNREGISTRED') {
      window.location.href = process.env.NEXT_PUBLIC_PLATFORM_URL + '/register';
    }

    if (state === 'SIGNED_OUT') {
      router.push('/');
    }
  }, [state, router]);

  return <MainLayout>{children}</MainLayout>;
};

export default PrivateMainLayout;
