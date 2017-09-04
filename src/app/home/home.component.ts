import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdlTextFieldComponent } from '@angular-mdl/core';

import { UserService } from '../shared';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  isAuthenticated: boolean;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          console.log("authenticated");
        } else {
          console.log("not authenticated")
        }
      }
    );
  }

  login(loginForm) {
    console.log(loginForm);
  }
}
