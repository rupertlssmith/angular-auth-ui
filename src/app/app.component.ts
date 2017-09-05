import { Component, OnInit, Inject } from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from './app.store';
import { AppState } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(AppStore) private store: Redux.Store<AppState>,
  ) {
    console.log("AppComponent constructor: called")
  }

  ngOnInit() {
    //this.userService.refresh();
  }
}
