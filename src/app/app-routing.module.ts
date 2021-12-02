import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './Components/book/book.component';

import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { GetBooksComponent } from './Components/get-books/get-books.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { OrderSuccessfullComponent } from './Components/order-successfull/order-successfull.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes: Routes = [
  {path:'login', component:LoginRegisterComponent},
  { path:'forgotPassword', component:ForgotPasswordComponent},
  { path:'resetPassword', component:ResetPasswordComponent},
  { path:'home', component:HomeComponent},
  { path:'getBooks', component:GetBooksComponent},
  { path:'book', component:BookComponent},
  {path:'Order-successfull',component:OrderSuccessfullComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
