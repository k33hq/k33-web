import { AppStates, getAppState, register } from 'core';
import { FirebaseOptions } from 'firebase/app';
import { init } from 'core';
import * as React from 'react';
import { useRouter } from 'next/router';

export const useAppState = (firebaseConfig: FirebaseOptions) => {
  const [state, setState] = React.useState<AppStates>('LOADING');

  React.useEffect(() => {
    init(firebaseConfig);
  }, [firebaseConfig]);

  React.useEffect(() => {
    getAppState().then((s) => setState(s));
  }, []);

  return state;
};

interface AppOptions {
  home: string;
  registration: string;
}

export const useAuth = (
  firebaseConfig: FirebaseOptions,
  options: AppOptions
) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();

  React.useEffect(() => {
    if (state === 'REGISTERED') {
      router.push(options.home);
    } else if (state === 'UNREGISTERED') {
      register().then((state) => router.reload());
    }
  }, [state, router, options]);

  return state;
};
