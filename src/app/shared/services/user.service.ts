import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { User } from '../models';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http
  ) { }

  // Try to refresh the token, if holding a valid token already, this will provide
  // a refreshed token. Otherwise it should come back with an unathed 401 code.
  refresh() {
    console.log("refresh: called");

    this.apiService.get('/refresh')
      .subscribe(
      data => this.setAuth(data.user),
      err => this.purgeAuth()
      );
  }

  login(credentials) {
    console.log("login: called");

     this.apiService.post('/login', credentials)
      .subscribe(
      data => {
        this.setAuth(data.user);
        return data;
      }
      );
  }

  setAuth(user: User) {
    console.log("setAuth: called");

    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    console.log("purgeAuth: called");

    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user', { user })
      .map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }

}
