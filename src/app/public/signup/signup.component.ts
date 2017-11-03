import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from './../../service/cognito.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public confirmationForm: FormGroup;
  public successfullySignup: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cognito: CognitoService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.confirmationForm = this.fb.group({
      'email': ['', Validators.required],
      'confirmationCode': ['', Validators.required]
    });
  }

  onSubmitSignup(value: any) {
    const email = value.email, password = value.password;
    this.cognito.signUp(email, password)
    .then((result) => {
      console.log(result);
      this.successfullySignup = true;
    }).catch((err) => {
      console.log(err);
    });
  }

  onSubmitConfirmation(value: any) {
    const email = value.email, confirmationCode = value.confirmationCode;
    console.log(email);
    this.cognito.confirmation(email, confirmationCode)
    .then((result) => {
      return console.log(result) || this.router.navigate(['/login']);
    }).catch((err) => {
      console.log(err);
    });
  }
}
