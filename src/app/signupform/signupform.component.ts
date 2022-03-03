import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/global.interfaces'

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.sass']
})

export class SignupformComponent implements OnInit {
  public isPasswordValid: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public ngOnInit(): void { }
  public onSubmit(): void { }

  signupform = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z]).*$/),
    ])
  });

  validatePassword(): boolean {
    let regex = new RegExp(this.signupform.controls['firstname'].value + '|' + this.signupform.controls['lastname'].value);
    this.isPasswordValid = regex.test(this.signupform.controls['password'].value) ? false : true;
    !this.isPasswordValid && this.signupform.controls['password'].setErrors({ 'incorrect': true });
    return this.isPasswordValid;
  }

  get emailRequired() {
    let control = this.signupform.controls;
    return control['email'].errors && control['email'].errors['required']
  }

  get emailPattern() {
    let control = this.signupform.controls;
    return control['email'].errors && control['email'].errors['pattern']
  }

  get passwordRequired() {
    let control = this.signupform.controls;
    return control['password'].errors && control['password'].errors['required'];
  }

  get passwordLength() {
    let control = this.signupform.controls;
    return control['password'].errors && control['password'].errors['minlength'];
  }

  get passwordPattern() {
    let control = this.signupform.controls;
    return control['password'].errors && control['password'].errors['pattern'];
  }

  submit() {
    this.validatePassword();
    console.log('isvalidInSubmit: ', this.isPasswordValid);
    if (this.signupform.valid && this.isPasswordValid) {
      const user: User = {
        firstName: this.signupform.controls['firstname'].value,
        lastName: this.signupform.controls['lastname'].value,
        email: this.signupform.controls['email'].value,
      }
      this.http.post('https://demo-api.vercel.app/users', user)
        .subscribe(() => {
          this.router.navigate(['/success']);
        })
    }
  }
}
