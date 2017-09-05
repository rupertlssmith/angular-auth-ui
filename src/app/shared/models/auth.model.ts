import { Action, ActionCreator } from 'redux';

import { Token } from './token.model';

// The Auth state.

export class Auth {
  token?: string;
  decodedToken?: Token;
  refreshFrom?: Date;
  errorMsg: String;
  authState: AuthState;
  forwardLocation: string;
  logoutLocation: string;
  logonAttempted: boolean;
}

export class AuthState {
  loggedIn: boolean;
  permissions: string[];
  expiresAt?: Date;
  username: string;
}

// Credentials.

export class Credentials {
  username: string;
  password: string;
}

// Initial state.

const init: Auth = {
  token: null,
  decodedToken: null,
  refreshFrom: null,
  errorMsg: "",
  authState: null,
  forwardLocation: "",
  logoutLocation: "",
  logonAttempted: false
};

// Actions that can update the state.

export const LOG_IN = 'Log In';
export interface LogInAction extends Action {
  credentials: Credentials;
}
export const logIn: ActionCreator<LogInAction> =
  (credentials) => ({
    type: LOG_IN,
    credentials: credentials
  });


export const REFRESH = 'Refresh';
export interface RefreshAction extends Action { }
export const refresh: ActionCreator<RefreshAction> =
  () => ({
    type: REFRESH
  });

export const LOG_OUT = 'Log Out';
export interface LogOutAction extends Action { }
export const logOut: ActionCreator<LogOutAction> =
  () => ({
    type: LOG_OUT
  });


export const NOT_AUTHED = 'Not Authed';
export interface NotAuthedAction extends Action { }
export const notAuthed: ActionCreator<NotAuthedAction> =
  () => ({
    type: NOT_AUTHED
  });

export const REFRESHED = 'Refreshed'
export interface RefreshedAction extends Action { }
export const refreshed: ActionCreator<RefreshedAction> =
  () => ({
    type: REFRESHED
  });


export const AuthReducer =
  function(state: Auth = init, action: Action): Auth {
    switch (action.type) {
      case LOG_IN:
        return state;
      case REFRESH:
        return state;
      case LOG_OUT:
        return state;
      case NOT_AUTHED:
        return state;
      case REFRESHED:
        return state;
      default:
        return state;
    }
  };
