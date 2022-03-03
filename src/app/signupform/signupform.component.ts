import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

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
  ) {

  }

  public ngOnInit(): void { 

  }

  public onSubmit(): void {

  }

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
      //Validators.pattern(this.validatePassword())
    ])
  });

  validatePassword(): boolean {
    let regex = new RegExp(this.signupform.controls['firstname'].value +'|'+ this.signupform.controls['lastname'].value);
    this.isPasswordValid = regex.test(this.signupform.controls['password'].value) ? false : true;
    !this.isPasswordValid && this.signupform.controls['password'].setErrors({'incorrect': true});
    return this.isPasswordValid;
  }

  get f() {
    return this.signupform.controls;
  }

  submit() {
    this.validatePassword();
    console.log('isvalidInSubmit: ',this.isPasswordValid);
    if(this.signupform.valid && this.isPasswordValid){
      const user: User = {
        firstName: this.signupform.controls['firstname'].value,
        lastName: this.signupform.controls['lastname'].value,
        email: this.signupform.controls['email'].value,
      }
      this.http.post('https://demo-api.vercel.app/users', user)
      .subscribe((response: any)=>{
        console.log('repsonse ',response);
        this.router.navigate(['/success']);
      })
    } else {

    }
  }
}
