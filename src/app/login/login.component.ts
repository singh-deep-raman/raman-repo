import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
/**
 * This class is login component where user can login into application
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  storage: Storage;
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.storage = window.sessionStorage;
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  /**
   * This method checks whether entered credentials are valid or invalid
   *
   * @memberof LoginComponent
   */
  isValidUser() {
    const userName = this.userForm.get('username').value;
    const password = this.userForm.get('password').value;
    const user = new User(userName, password);
    this.authService.isRegisteredUser(user).subscribe((userExists: boolean) => {
      if (userExists) {
        this.messageService.add({ severity: 'success', summary: 'Login Successful' });
        this.router.navigate(['/students']).then(nav => {
        }, err => {
        });
        this.storage.setItem('userInfo', JSON.stringify(user));
      } else {
        this.messageService.add({ severity: 'error', summary: 'Invalid Credentials' });
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Some error occurred' });
    });
  }

}
