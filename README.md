# Sign Up Form

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## How To run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## What is in the form

- The form allow users to enter
    - first name
    - last name
    - email
    - password
- All fields are required

Password have to be minimum of eight character, it msut contains at least one lowercase and one uppercase charaters, and can not contains the first or the last name of the user.

The "first name, last name" password validation runs on submit.

The form makes a `post` request to  `https://demo-api.now.sh/users` sending the first name, last name and email address. 

After the post is successful it loads a success page and we able to create a new sign up from there.