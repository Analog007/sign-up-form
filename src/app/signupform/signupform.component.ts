import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/global.interfaces'

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.sass']
})

export class SignupformComponent {
  public isPasswordValid: boolean = true;
  public controls: {[key: string]: AbstractControl} = {};

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

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.controls = this.signupform.controls;
  }
  
  validatePassword(): boolean {
    let regex = new RegExp(this.signupform.controls['firstname'].value + '|' + this.signupform.controls['lastname'].value);
    this.isPasswordValid = regex.test(this.signupform.controls['password'].value) ? false : true;
    !this.isPasswordValid && this.signupform.controls['password'].setErrors({ 'incorrect': true });
    return this.isPasswordValid;
  }

  get emailRequired() {
    const control = this.controls['email'];
    return control.errors?.['required'];
  }

  get emailPattern() {
    const control = this.controls['email'];
    return control.errors?.['pattern'];
  }

  get passwordRequired() {
    const control = this.controls['password'];
    return control.errors?.['required'];
  }

  get passwordLength() {
    const control = this.controls['password'];
    return control.errors?.['minlength'];
  }

  get passwordPattern() {
    const control = this.controls['password'];
    return control.errors?.['pattern'];
  }

  submit() {
    this.validatePassword();
    if (this.signupform.valid && this.isPasswordValid) {
      const user: User = {
        firstName: this.controls['firstname'].value,
        lastName: this.controls['lastname'].value,
        email: this.controls['email'].value,
      }
      this.http.post('https://demo-api.vercel.app/users', user)
        .subscribe(() => {
          this.router.navigate(['/success']);
        })
    }
  }
}
