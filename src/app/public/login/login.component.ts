import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from './../../service/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cognito: CognitoService
  ) {
    this.cognito.isAuthenticated()
    .then((res) => {
      return console.log(res) || this.router.navigate(['/upload']);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmitLogin(value: any) {
    const email = value.email, password = value.password;
    this.cognito.login(email, password)
    .then((result) => {
      return console.log(result) || this.router.navigate(['/upload']);
    }).catch((err) => {
      console.log(err);
    });
  }
}
