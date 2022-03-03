import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupformComponent } from './signupform/signupform.component'
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignupformComponent
  },
  {
    path: 'success',
    component: SuccessPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
