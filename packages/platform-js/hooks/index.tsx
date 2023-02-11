import { AppStates, getAppState } from 'core';
import { FirebaseOptions } from 'firebase/app';
import { init } from 'core';
import * as React from 'react';

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
