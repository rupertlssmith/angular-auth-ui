import { Action, ActionCreator } from 'redux';
import { createSelector } from 'reselect';

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

// Other data models needed.

export class Credentials {
  username: string;
  password: string;
}

export class Token {
  sub: string;
  iss?: string;
  aud?: string;
  exp?: Date;
  iat?: Date;
  jti?: string;
  scopes: string[];
}

// Initial state.

const init: Auth = {
  token: null,
  decodedToken: null,
  refreshFrom: null,
  errorMsg: "",
  authState: {
    loggedIn: false,
    permissions: [],
    expiresAt: null,
    username: ""
  },
  forwardLocation: "",
  logoutLocation: "",
  logonAttempted: false
};

// Selector functions on the model.

const getAuth = (appState): Auth => appState.auth;

const getAuthState = createSelector(
  getAuth,
  (auth: Auth) => auth.authState);

export const isLoggedIn = createSelector(
  getAuthState,
  (authState: AuthState) => authState.loggedIn);

// Actions that can update the state.
export const NOT_AUTHED = 'Not Authed';
export interface NotAuthedAction extends Action { }
export const notAuthed: ActionCreator<NotAuthedAction> =
  () => ({
    type: NOT_AUTHED
  });

export const NEW_TOKEN = 'New Token'
export interface NewTokenAction extends Action {
  token: string
}
export const newToken: ActionCreator<NewTokenAction> =
  (token) => ({
    type: NEW_TOKEN,
    token: token
  });

export const AuthReducer =
  function(state: Auth = init, action: Action): Auth {
    console.log("AuthReducer reduce: called");
    console.log(state);
    console.log(action);

    switch (action.type) {
      case NOT_AUTHED:
        return state;
      case NEW_TOKEN:
        const token = (<NewTokenAction>action).token;
        const parsedToken = parseJwt(token);
        
        console.log(parsedToken);

        return {
          ...state,
          token: token,
          decodedToken: parsedToken,
          authState : {
            ...state.authState,
            loggedIn : true,
            permissions: parsedToken.scopes
          }
        }
      default:
        return state;
    }
  };


function parseJwt(token: string): Token {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
