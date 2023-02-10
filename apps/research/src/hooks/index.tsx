import * as React from 'react';
import { AppStates, getAppState, googleLogin, init, isLoggedIn } from 'core';
import config from '@/firebase/config';

export const useK33App = (): [AppStates, () => void] => {
  const [state, setState] = React.useState<AppStates>('LOADING');

  React.useEffect(() => {
    init(config);
  }, []);

  React.useEffect(() => {
    if (isLoggedIn()) {
      setState('REGISTRED');
    } else {
      setState('SIGNED_OUT');
    }
  }, []);

  const handleGoogleLogin = () => {
    googleLogin(
      (user) => {
        setState('REGISTRED');
      },
      (err) => console.log(err)
    );
  };

  return [state, handleGoogleLogin];
};
