import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import { AuthService } from '../login/shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { MessageService } from 'primeng/api';
/**
 * This component is used to display header of application when user is logged in.
 * It contains 2 links to Onboard and view students.
 * It also displays logout button and logged in user name.
 *
 * @export
 * @class HeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn = false;
  items: MenuItem[];
  HeaderMenuItem: MenuItem[];
  storage: Storage;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService) {
    this.storage = window.sessionStorage;
  }
  /**
   * This method initializes header component navigation links and subscribes to logged in user variable
   *
   * @memberof HeaderComponent
   */
  ngOnInit() {
    this.HeaderMenuItem = [
      {
        label: 'Admin',
        icon: 'fa fa-user-circle'
      },
      {
        label: 'Log Out',
        icon: 'fa fa-power-off',
        styleClass: 'logout',
        command: (() => {
          this.storage.clear();
          this.userLoggedIn = false;
          this.messageService.add({ severity: 'success', summary: 'Logged out successfully !!!' });
          this.router.navigate(['/login']);
        })
      }
    ];

    this.items = [
      {
        label: 'Onboard Student',
        icon: 'fa plus-square',
        routerLink: 'onboard'
      },
      {
        label: 'List Students',
        routerLink: 'students'
      }];
    this.authService.userLoggedIn$.subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
    });
    const user = JSON.parse(this.storage.getItem('userInfo')) as User;
    if (user && user.username) {
      this.userLoggedIn = true;
    }
  }

}
