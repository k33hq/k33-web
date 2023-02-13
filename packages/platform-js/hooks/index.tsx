import { AppStates, getAppState } from 'core';
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
    if (state === 'REGISTRED') {
      router.push(options.home);
    } else if (state === 'UNREGISTRED') {
      router.push(options.registration);
    }
  }, [state, router, options]);

  return state;
};
