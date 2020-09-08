import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { author } from 'src/app/models/author';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:string;
  password:string;
  author:author;

  constructor(private dataservice:DataService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.author={
      name:this.username,
      password:this.password
    };
    this.dataservice.signup(this.author).subscribe(data=>{
      console.log(data);
    });

  }

}
