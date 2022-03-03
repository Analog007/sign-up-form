import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupformComponent } from './signupform.component';
import { User } from '../interfaces/global.interfaces';

let mockRouter: any;

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('SignupformComponent', () => {
  let component: SignupformComponent;
  let fixture: ComponentFixture<SignupformComponent>;
  let mockFirstName: string = 'test';
  let mockLastName: string = 'user';


  beforeEach(async () => {
    mockRouter = new MockRouter();
    await TestBed.configureTestingModule({
      declarations: [SignupformComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signupform.valid).toBeFalsy();
  });

  it('first and lastname validation', () => {
    let errors: { [key: string]: any; } = {};
    let firstname = component.signupform.controls['firstname'];
    let lastname = component.signupform.controls['lastname'];
    expect(firstname.valid).toBeFalsy();
    expect(lastname.valid).toBeFalsy();

    // First name field is required
    errors = firstname.errors || {};
    expect(errors['required']).toBeTruthy();

    // Last name field is required
    errors = lastname.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set first name to something correct
    firstname.setValue(mockFirstName);
    errors = firstname.errors || {};
    expect(errors['required']).toBeFalsy();

    // Set last name to something correct
    lastname.setValue(mockLastName);
    errors = lastname.errors || {};
    expect(errors['required']).toBeFalsy();

  });

  it('email validation', () => {
    let errors: { [key: string]: any; } = {};
    let email = component.signupform.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors: { [key: string]: any; } = {};
    let firstname = component.signupform.controls['firstname'];
    let lastname = component.signupform.controls['lastname'];
    let password = component.signupform.controls['password'];

    firstname.setValue(mockFirstName);
    lastname.setValue(mockLastName);

    // Password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something short and incorrect
    password.setValue("abcde");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['pattern']).toBeTruthy();
    expect(component.isPasswordValid).toBeTruthy();

    // Set password to something not has at least one upper and lower case
    password.setValue("123456789");
    errors = password.errors || {};
    component.validatePassword();
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();
    expect(component.isPasswordValid).toBeTruthy();

    // Set password to something not lowercase
    password.setValue("ABCDEFGHI");
    errors = password.errors || {};
    component.validatePassword();
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();
    expect(component.isPasswordValid).toBeTruthy();

    // Password contains first name
    password.setValue("passtestword");
    errors = password.errors || {};
    component.validatePassword();
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(component.isPasswordValid).toBeFalsy();

    // Password contins last name
    password.setValue("userpassword");
    errors = password.errors || {};
    component.validatePassword();
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(component.isPasswordValid).toBeFalsy();

    // Set password to something Correct
    password.setValue("AbcdefgH");
    errors = password.errors || {};
    component.validatePassword();
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(component.isPasswordValid).toBeTruthy();


  });

  it('submitting the form', () => {
    expect(component.signupform.valid).toBeFalsy();
    component.signupform.controls['firstname'].setValue(mockFirstName);
    component.signupform.controls['lastname'].setValue(mockLastName);
    component.signupform.controls['email'].setValue("thomas@shelby.co.uk");
    component.signupform.controls['password'].setValue("PassWord123");
    expect(component.signupform.valid).toBeTruthy();

    component.submit();
  });

});
