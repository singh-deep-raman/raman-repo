import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import { AuthService } from '../login/shared/services/auth.service';
import { User } from '../shared/models/user.model';

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
    private authService: AuthService) {
    this.storage = window.sessionStorage;
  }

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
        // icon: 'fa-dashboard', todo
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
