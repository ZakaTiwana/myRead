import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { addbook } from 'src/app/models/addbook';
import { AuthorAuthenticateService } from 'src/app/author-authenticate.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
  title: string;
  desc:string;
  tag:string[]=[];
  addbook:addbook;
  token:string;
  constructor(private dataservice:DataService, private authorAuthenticateService:AuthorAuthenticateService) { }

  ngOnInit() {}
  
  onSubmit(){
    console.log("onsubmitclicked")
    this.addbook={
      title:this.title,
      description:this.desc,
      tag:this.tag
    };
    this.token=this.authorAuthenticateService.getData();
    console.log(this.addbook);
    this.dataservice.addbook(this.addbook,this.token).subscribe(data=>{
      console.log(data);
    });
  }

}
