import { User } from './../../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
/**
 * This service is used for authentication of user.
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {

  SERVER_URL = 'https://localhost:4200/api';
  userLoggedIn$: Observable<boolean>;
  private userLoggedInSubject: Subject<boolean>;

  constructor(
    private httpClient: HttpClient) {
    this.userLoggedInSubject = new Subject<boolean>();
    this.userLoggedIn$ = this.userLoggedInSubject.asObservable();
  }

  /**
   * This method returns true if the username and password belongs to valid user, otherwise false
   *
   *
   * @param {User} user - user object contains username and password
   * @returns
   * @memberof AuthService
   */
  isRegisteredUser(user: User) {
    const validUser$ = new Observable<boolean>(observer => {
      this.httpClient.get(`${this.SERVER_URL + '/registeredUsers'}`).subscribe((registeredUsers: Array<User>) => {
        if (registeredUsers.find(regUser => regUser.username === user.username && regUser.password === user.password)) {
          this.userLoggedInSubject.next(true);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      });

    });
    return validUser$;
  }

}
