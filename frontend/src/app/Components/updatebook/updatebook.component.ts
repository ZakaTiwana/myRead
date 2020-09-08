import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { AuthorAuthenticateService } from 'src/app/author-authenticate.service';
import { BookdataService } from 'src/app/bookdata.service';
import { book } from 'src/app/models/book';
import { editbook } from 'src/app/models/editbook';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  title: string;
  desc: string;
  tag: string;
  editbook: editbook;
  token: string;
  book: book;
  status:string;
  tag2:string[]=[];
  constructor(private dataservice: DataService,
    private authorAuthenticateService: AuthorAuthenticateService, private bookdataservice: BookdataService) { }

  ngOnInit() {
    this.book = this.bookdataservice.getData();
    console.log(this.book.title);
  }
  onSubmit() {
    console.log("oneditclicked")
    this.tag2.push(this.tag);
    this.editbook = {
      book_id: this.book._id,
      description: this.desc,
      status:this.status,
      tag: this.tag2
    };

    this.token = this.authorAuthenticateService.getData();
    console.log(this.editbook);
    this.dataservice.updatebook(this.editbook,this.token).subscribe(data=>{
      console.log(data);
    });
  }

}
