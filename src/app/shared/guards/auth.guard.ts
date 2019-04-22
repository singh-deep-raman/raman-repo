/*
 *   Auth Guard - Check whether user is authenticated or not
 */
import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../models/user.model';
/**
 * This guard prevents user to access application pages if the user is not valid
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {

  storage: Storage;

  constructor(
    public router: Router
  ) {
    this.storage = window.sessionStorage;
  }

  /**
   * Method implemented to be a guard deciding if a route can be activated (means a user is logged in or not)
   * @returns {boolean} : Returns boolean value
   */
  canActivate(): boolean {
    const user = JSON.parse(this.storage.getItem('userInfo')) as User;
    if (user && user.username) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
