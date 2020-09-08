import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/header/nav-bar/nav-bar.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { BookCardComponent } from './Components/book/book-card/book-card.component';
import { SignupComponent } from './Components/author/signup/signup.component';
import { SigninComponent } from './Components/author/signin/signin.component';
import { HomeComponent } from './Components/home/home.component';
import { BookInfoComponent } from './Components/book-info/book-info.component';
import { ReadbookComponent } from './Components/readbook/readbook.component';
import { AuthorViewBookComponent } from './Components/author-view-book/author-view-book.component';
import { AuthorBookComponent } from './Components/author-book/author-book.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { UpdatebookComponent } from './Components/updatebook/updatebook.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    BookCardComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    BookInfoComponent,
    ReadbookComponent,
    AuthorViewBookComponent,
    AuthorBookComponent,
    AddBookComponent,
    UpdatebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
