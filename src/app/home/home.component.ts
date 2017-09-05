import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdlTextFieldComponent } from '@angular-mdl/core';
import * as Redux from 'redux';

import { UserService } from '../shared';

import { AppStore } from '../app.store';
import * as Auth from '../shared/models/auth.model';
import { AppState } from '../app.reducer';


@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    @Inject(AppStore) private store: Redux.Store<AppState>,
    private router: Router,
    private userService: UserService
  ) {
    console.log("HomeComponent constructor: called");

    store.subscribe(() => this.updateState());
  }

  updateState() {
    console.log("updateState: called");

    const state = this.store.getState();
    //this.isLoggedIn = Auth.isLoggedIn(state);

    if (this.isLoggedIn) {
      console.log("authenticated");
    } else {
      console.log("not authenticated")
    }

    //console.log(Auth.isLoggedIn(state));
  }

  ngOnInit() {
    console.log("HomeComponent ngOnInit: called");
    this.store.dispatch(Auth.refresh());
  }

  login(loginForm) {
    console.log("HomeComponent loginForm: called");
    this.store.dispatch(Auth.logIn(loginForm));
  }
}
