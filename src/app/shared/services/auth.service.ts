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
  // a refreshed token. Otherwise it should come back with an unathed 401 code.
  refresh() {
    console.log("AuthService refresh: called");

    this.apiService.get('/refresh')
      .subscribe(
      data => this.setAuth(data.token),
      err => this.purgeAuth()
      );
  }

  login(credentials) {
    console.log("AuthService login: called");

     this.apiService.post('/login', credentials)
      .subscribe(
      data => {
        this.setAuth(data.token);
        return data;
      }
      );
  }

  setAuth(token: string) {
    console.log("AuthService setAuth: called");
    console.log(token);

    this.store.dispatch(Auth.newToken(token));
  }

  purgeAuth() {
    console.log("AuthService purgeAuth: called");
  }
}
