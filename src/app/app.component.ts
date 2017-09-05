import { Component, OnInit, Inject } from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from './app.store';
import { AppState } from './app.reducer';

import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(AppStore) private store: Redux.Store<AppState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.refresh();
  }
}
