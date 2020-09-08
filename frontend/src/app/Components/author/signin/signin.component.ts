import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { author } from 'src/app/models/author';
import { authorAuthenticate } from 'src/app/models/authorAuthenticate';
import { AuthorAuthenticateService } from 'src/app/author-authenticate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;
  author: author;
  authorAuthenticate:authorAuthenticate;
  token:string="";

  constructor(private router:Router, private dataservice: DataService,
    private autherAuthenticateService:AuthorAuthenticateService) { 
  
  }

  ngOnInit() {

  }
  onSubmit() {
    this.author = {
      name: this.username,
      password: this.password
    };
    this.dataservice.login(this.author).subscribe(data => {
      
      this.authorAuthenticate=data;
      // console.log(this.authorAuthenticate.token);
      // this.token=this.authorAuthenticate.token;
      this.autherAuthenticateService.setData(this.authorAuthenticate.token);
      this.autherAuthenticateService.setID(this.authorAuthenticate.author._id);
      this.router.navigate(['author-view-book']);
    });

  }

}
