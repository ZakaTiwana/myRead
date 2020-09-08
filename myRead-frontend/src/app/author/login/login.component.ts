import { Component, OnInit } from '@angular/core';
import { author } from "./../../models/author";
import { DataService } from "./../../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  pwd:string;
  author:author;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {}
  onSubmit(){
    if(this.email === "" || this.pwd === "") return;
    console.log("in here");
    this.author = {
      name:this.email,
      password:this.pwd
    };
    this.dataService.login(this.author).subscribe(data=>{
      console.log("datad retruned" + data);
    });

  }
}
