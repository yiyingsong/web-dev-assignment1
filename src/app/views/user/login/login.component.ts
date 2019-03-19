import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';

import {NgForm} from '@angular/forms';
import { ViewChild } from '@angular/core';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') myLoginForm: NgForm;
  username: string;
  password: string;

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private router: Router, private _userService: UserService,  private sharedService: SharedService) { }

  ngOnInit() {}

  login() {

    // fetching data from loginForm
    this.username = this.myLoginForm.value.username;
    this.password = this.myLoginForm.value.password;

    this._userService.findUserByCredential(this.username, this.password)
        .subscribe((user: User) => {
              if (user) {
                console.log(user);
                this.sharedService.user = user;
                this.router.navigate(['/user', user._id]);
              } else {
                this.errorFlag = true;
              }
            }
        );
  }

}
