import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './Components/author/signup/signup.component'
import { HomeComponent } from './Components/home/home.component';
import { SigninComponent } from './Components/author/signin/signin.component';
import { BookInfoComponent } from './Components/book-info/book-info.component';
import { ReadbookComponent } from './Components/readbook/readbook.component';
import { AuthorViewBookComponent } from './Components/author-view-book/author-view-book.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { UpdatebookComponent } from './Components/updatebook/updatebook.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'book-info',component:BookInfoComponent},
  {path:'book-info/read-book',component:ReadbookComponent},
  {path:'author-view-book',component:AuthorViewBookComponent},
  {path:'addbook',component:AddBookComponent},
  {path:'updatebook',component:UpdatebookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
