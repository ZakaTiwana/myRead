import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { author } from "../../models/author";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email:string;
  pwd:string;
  author:author;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {}
  onSubmit(){
    if(this.email === "" || this.pwd === "") return;
    this.author={
      name:this.email,
      password:this.pwd
    };
    this.dataService.signup(this.author).subscribe(data=>{
      console.log(data);
    });

  }
}
