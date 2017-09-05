import { Injectable, Inject } from '@angular/core';
import * as Redux from 'redux';
import { AppState } from '../../app.reducer';

import { ApiService } from './api.service';
import * as Auth from '../models/auth.model';
import { AppStore } from '../../app.store';

@Injectable()
export class AuthService {
  constructor(
    private apiService: ApiService,
    @Inject(AppStore) private store: Redux.Store<AppState>
  ) { }

  // Try to refresh the token, if holding a valid token already, this will provide
  // a refreshed token (and refresh token). Otherwise it should come back with an
  // unauthed 401 code.
  refresh() {
    console.log("AuthService refresh: called");

    this.apiService.get('/refresh')
      .subscribe(
      data => this.newToken(data.token),
      err => this.clearAuthState()
      );
  }

  // Try to log in with username/password credentials. If these are valid, this
  // will provide a new token (and refresh token). Otherwise it should come back
  // with an unauthed 401 code.
  login(credentials) {
    console.log("AuthService login: called");

     this.apiService.post('/login', credentials)
      .subscribe(
      data => {
        this.newToken(data.token);
        return data;
      }
      );
  }

  newToken(token: string) {
    console.log("AuthService setAuth: called");
    console.log(token);

    this.store.dispatch(Auth.newToken(token));
  }

  clearAuthState() {
    console.log("AuthService clearAuthState: called");

    this.store.dispatch(Auth.notAuthed());
  }
}
