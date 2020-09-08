import { Component, OnInit } from '@angular/core';
import { book } from 'src/app/models/book';
import { DataService } from 'src/app/data.service';
import { AuthorAuthenticateService } from 'src/app/author-authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-view-book',
  templateUrl: './author-view-book.component.html',
  styleUrls: ['./author-view-book.component.css']
})
export class AuthorViewBookComponent implements OnInit {
  books: book[];
  id:string="";
  token:string="";
  constructor(private router:Router, private dataservice: DataService, 
    private autherAuthenticateService:AuthorAuthenticateService) { }

  ngOnInit() {
    
    this.id=this.autherAuthenticateService.getID();
    console.log('authorid'+this.id);
    this.dataservice.getAuthorBookRecord(this.id).subscribe(data => {
      this.books = data;
      console.log('books'+data);
    });
  }
  addbook(){
    console.log("addbook clicked");
    this.router.navigate(['addbook']);
  }
  deletebook(book:book) {
    // Remove From UI
    console.log("taji ki farmayish");
    this.books = this.books.filter(b => b._id !== book._id);
    // Remove from server
      this.token=this.autherAuthenticateService.getData();
    this.dataservice.deleteBook(book._id,this.token).subscribe();
  }
}
