import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Token } from '../models/auth.model';

@Injectable()
export class AuthService {
  // private currentUserSubject = new BehaviorSubject<User>(new User());
  // public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  //
  // private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  // public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http
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
        this.setAuth(data.user);
        return data;
      }
      );
  }

  setAuth(token: Token) {
    console.log("AuthService setAuth: called");
    // this.currentUserSubject.next(user);
    // this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    console.log("AuthService purgeAuth: called");
    //this.currentUserSubject.next(new User());
    //this.isAuthenticatedSubject.next(false);
  }

  // getCurrentUser(): User {
  //   return this.currentUserSubject.value;
  // }
  //
  // update(user): Observable<User> {
  //   return this.apiService
  //     .put('/user', { user })
  //     .map(data => {
  //       this.currentUserSubject.next(data.user);
  //       return data.user;
  //     });
  // }

}
