// init
// signInCheck => getUser
// anonymousSignIn
// appleIdSignIn
// googleSignIn
// -------- getUser
// -----------postUser
// register:
// - if apple, firebase custom token call
// - call postUser
// signout

import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  initializeAuth,
  getAuth,
  signInAnonymously,
  linkWithCredential,
  AuthCredential,
  linkWithPopup,
  AuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
  setPersistence,
  onAuthStateChanged,
  NextOrObserver,
  User,
  Auth,
  signOut,
  OAuthProvider,
} from 'firebase/auth';
import type {
  LoginSuccessCallback,
  LoginErrorCallback,
  AppleErrorLogin,
  LinkFailure,
  LinkSuccess,
  AppleIDConfig,
  AppleSuccessLogin,
} from './types';

// app states

export const LOADING = 'LOADING';
export const SIGNED_OUT = 'SIGNED_OUT';
export const SIGNED_IN = 'SIGNED_IN';
export const UNREGISTERED = 'UNREGISTRED';
export const REGISTRED = 'REGISTRED';

export type AppStates =
  | typeof SIGNED_OUT
  | typeof UNREGISTERED
  | typeof REGISTRED
  | typeof LOADING;

const APP_NAME = 'k33-application';

// auth stuff
export const init = (config: FirebaseOptions) => {
  let auth: Auth | null = null;
  try {
    const app = getApp(APP_NAME);
    auth = getAuth(app);
  } catch (err) {
    auth = initializeAuth(initializeApp(config, APP_NAME), {
      persistence: browserLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  }
  return auth;
};

// google login stuff

export const googleLogin = (success: LinkSuccess, error: LinkFailure) => {
  const auth = getAuth(getApp(APP_NAME));
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider).then(success).catch(error);
    })
    .catch((error) => {});
};

export const appleLogin = (success: LinkSuccess, error: LinkFailure) => {
  const auth = getAuth(getApp(APP_NAME));
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      signInWithPopup(auth, provider).then(success).catch(error);
    })
    .catch((error) => {});
};

export const microsoftLogin = (success: LinkSuccess, error: LinkFailure) => {
  const auth = getAuth(getApp(APP_NAME));

  // TODO: change it when we go to prod
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      const provider = new OAuthProvider('microsoft.com');
      provider.setCustomParameters({
        tenant: isProd() ? 'common' : '929d58c5-dd83-427c-a163-3762f9562a1d',
      });
      signInWithPopup(auth, provider).then(success).catch(error);
    })
    .catch((err) => {});
};

export const logout = (success: () => void, error: (err: any) => void) => {
  const auth = getAuth(getApp(APP_NAME));
  signOut(auth).then(success).catch(error);
};

// apple id stuff

export const appleIdSignIn = (
  success: AppleSuccessLogin,
  error: AppleErrorLogin
) => {
  //@ts-ignore
  if (typeof window !== 'undefined') {
    //@ts-ignore
    window.AppleID.auth.signIn().then(success).catch(error);
  } else {
    throw Error(
      'cant find windows object, are you sure you are running this on the browser?, also do not forget to add the applejs script tag in the html head'
    );
  }
};

export const appleSignInInit = (config: AppleIDConfig) => {
  //@ts-ignore
  if (typeof window !== 'undefined') {
    //@ts-ignore
    window.AppleID.auth.init(config);
  } else {
    throw Error(
      'cant find windows object, are you sure you are running this on the browser?, also do not forget to add the applejs script tag in the html head'
    );
  }
};

// check whether logged in

export const isLoggedIn = () => {
  const auth = getAuth(getApp(APP_NAME));
  return !!auth.currentUser;
};

// get user Info
export const getUserInformation = (callback: NextOrObserver<User>) => {
  const auth = getAuth(getApp(APP_NAME));
  onAuthStateChanged(auth, callback);
};

// anon
export const anonymousSignIn = (
  success: LoginSuccessCallback,
  error: LoginErrorCallback
) => {
  const auth = getAuth();
  signInAnonymously(auth).then(success).catch(error);
};

export const linkAnonymousUser = (
  credential: AuthCredential,
  success: LinkSuccess,
  error: LinkFailure
) => {
  const auth = getAuth();
  linkWithCredential(auth.currentUser!, credential).then(success).catch(error);
};

export const linkAnonymousUserWithProvider = (
  provider: AuthProvider,
  success: LinkSuccess,
  error: LinkFailure
) => {
  const auth = getAuth();
  linkWithPopup(auth.currentUser!, provider).then(success).catch(error);
};

// remove user id and update the analytics with tag id
const registerAnalytics = (analyticsId: string, tagId: string) => {
  //@ts-ignore
  window.gtag('config', tagId, {
    user_id: analyticsId,
  });
};

export const acceptCookie = () => {
  //@ts-ignore
  localStorage.setItem('showCookies', 'NO');
  //@ts-ignore
  window.gtag('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'granted',
  });
};

export const denyCookie = () => {
  //@ts-ignore
  localStorage.setItem('showCookies', 'NO');
};

// returns a boolean
export const isCookie = () => {
  //@ts-ignore
  return localStorage.getItem('showCookies') === 'NO';
};

//

interface AppConfig {
  tagId: string;
}

export const getAppState = async (config?: AppConfig) => {
  try {
    const data = await fetcher(
      `https://${process.env.NEXT_PUBLIC_API_DOMAIN}/user`
    );
    if (data.status === 404) {
      return UNREGISTERED;
    } else {
      const user = await data.json();
      if (config) {
        registerAnalytics(user.analyticsId, config.tagId);
      }
      return REGISTRED;
    }
  } catch (err) {
    return SIGNED_OUT;
  }
};

export const register = async (config?: AppConfig) => {
  try {
    const data = await mutator(
      `https://${process.env.NEXT_PUBLIC_API_DOMAIN}/user`,
      'POST',
      {}
    );
    const user = await data.json();
    // register analytics
    if (config) {
      registerAnalytics(user.analyticsId, config.tagId);
    }
    return REGISTRED;
  } catch (err) {
    return SIGNED_OUT;
  }
};

// auth fetcher for api calls
export const fetcher = async (url: string) => {
  const token = await getIdToken();
  if (token) {
    //@ts-ignore
    return fetch(url, {
      method: 'GET',
      //@ts-ignore
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  } else {
    return Promise.reject(new Error('user not authenticated'));
  }
};

export const mutator = async <T extends object>(
  url: string,
  method: 'POST' | 'PUT',
  body: T
) => {
  const token = await getIdToken();
  if (token) {
    //@ts-ignore
    return fetch(url, {
      method,
      body: JSON.stringify(body),
      //@ts-ignore
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  } else {
    return Promise.reject(new Error('user not authenticated'));
  }
};

// simple function to get id token
export const getIdToken = async (forceRefresh?: boolean) => {
  const auth = getAuth(getApp(APP_NAME));
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(forceRefresh);
  } else {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) resolve(await user.getIdToken(forceRefresh));
        else reject(new Error('Token not found'));
      });
    });
  }
};

export const getCustomerId = () => {
  const auth = getAuth(getApp(APP_NAME));
  const id = auth.currentUser?.uid;
  return id;
};

export const getCustomerEmail = () => {
  const auth = getAuth(getApp(APP_NAME));
  const email = auth.currentUser?.email;
  return email;
};

export const isProd = () => {
  //@ts-ignore
  return window.location.hostname === 'k33.com';
};
