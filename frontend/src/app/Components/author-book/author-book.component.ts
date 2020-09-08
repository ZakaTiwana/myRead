import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { BookdataService } from 'src/app/bookdata.service';
import { DataService } from 'src/app/data.service';
import { AuthorAuthenticateService } from 'src/app/author-authenticate.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.css']
})
export class AuthorBookComponent implements OnInit {
  @Input() book:book;
  @Output() deletebook: EventEmitter<book> = new EventEmitter();
  token:string;
  constructor(private router:Router,
    private BookdataService:BookdataService, private dataService:DataService, 
    private authorAuthenticateService:AuthorAuthenticateService) { 
  }

  ngOnInit() {
  }
  editbook(){
    console.log("editbook clicked");
    this.BookdataService.setData(this.book);
    this.router.navigate(['updatebook']);
    // this.router.navigate(['book-info']);//redirects url to new component
  }
  deletebook2(){
    console.log("deletebook clicked");
    
      this.deletebook.emit(this.book);
    
    // this.token=this.authorAuthenticateService.getData();
    // this.dataService.deleteBook(this.book._id,this.token).subscribe();
  }
}
