import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReaderComponent } from './reader/reader.component';
import { AuthorComponent } from './author/author.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './author/sign-up/sign-up.component';
import { LoginComponent } from './author/login/login.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReaderComponent,
    AuthorComponent,
    FooterComponent,
    SignUpComponent,
    LoginComponent,
    Page404Component
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
