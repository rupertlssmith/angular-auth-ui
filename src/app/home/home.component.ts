import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdlTextFieldComponent } from '@angular-mdl/core';
import * as Redux from 'redux';

import { UserService } from '../shared';

import { AppStore } from '../app.store';
import { Auth } from '../shared/models/auth.model';
import { AppState, getAuthState, isLoggedIn } from '../app.reducer';


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent /*implements OnInit*/ {
  isLoggedIn: boolean;
  //isLoggedIn: Auth;

  constructor(
    @Inject(AppStore) private store: Redux.Store<AppState>,
    private router: Router,
    private userService: UserService
  ) {
    console.log("HomeComponent constructor: called");

    store.subscribe(() => this.updateState());
    //this.updateState();
  }

  updateState() {
    console.log("updateState: called");

    const state = this.store.getState();
    //this.isLoggedIn = isLoggedIn(state);

    console.log(isLoggedIn);
  }



  // ngOnInit() {
  //   this.userService.isAuthenticated.subscribe(
  //     (authenticated) => {
  //       this.isAuthenticated = authenticated;
  //
  //       // set the article list accordingly
  //       if (authenticated) {
  //         console.log("authenticated");
  //       } else {
  //         console.log("not authenticated")
  //       }
  //     }
  //   );
  // }

  login(loginForm) {
    console.log(loginForm);
    this.userService.login(loginForm);
  }
}
