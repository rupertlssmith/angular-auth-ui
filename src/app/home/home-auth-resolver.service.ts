import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from '../shared';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
    console.log("HomeAuthResolver constructor: called");
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log("HomeAuthResolver.resolve: called");
    
    return this.userService.isAuthenticated.take(1);

  }
}
