import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { HomeComponent } from './Components/home/home.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { GetBooksComponent } from './Components/get-books/get-books.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { EditBookComponent } from './Components/edit-book/edit-book.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { MyCartComponent } from './Components/my-cart/my-cart.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { MyOrderComponent } from './Components/my-order/my-order.component';
import { OrderSuccessfullComponent } from './Components/order-successfull/order-successfull.component';
import { BookComponent } from './Components/book/book.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    GetBooksComponent,
    BookComponent,
    AddBookComponent,
    EditBookComponent,
    UserProfileComponent,
    MyCartComponent,
    WishListComponent,
    MyOrderComponent,
    OrderSuccessfullComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatStepperModule,
    MatRadioModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [HomeComponent,GetBooksComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
