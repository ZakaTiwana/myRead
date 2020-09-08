import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';
import { AuthorComponent } from './author/author.component';
import { SignUpComponent } from './author/sign-up/sign-up.component';
import { LoginComponent } from './author/login/login.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path:"",
    component:ReaderComponent
  },
  {
    path:"author",
    component:AuthorComponent
  },
  {
    path:"sign-up",
    component:SignUpComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"**",
    component:Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
