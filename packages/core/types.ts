import type { UserCredential } from 'firebase/auth';

export interface LoginSuccessCallback {
  (): void;
}

export interface LoginErrorCallback {
  (error: any): void;
}

export interface AppleIDConfig {
  clientId: string;
  scope: string;
  redirectURI: string;
  usePopup: boolean;
}

export interface AppleSignInData {
  authorization: {
    code: string;
    id_token: string;
    state: string;
  };
  user: {
    email: string;
    name: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface AppleSuccessLogin {
  (data: AppleSignInData): void;
}

export interface AppleErrorLogin {
  (error: any): void;
}

export interface LinkSuccess {
  (user: UserCredential): void;
}

export interface LinkFailure {
  (error: any): void;
}
