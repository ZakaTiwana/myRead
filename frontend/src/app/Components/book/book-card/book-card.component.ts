import { Component, OnInit, Input } from '@angular/core';
import { book } from 'src/app/models/book';
import { Router }         from '@angular/router';
import { BookdataService } from 'src/app/bookdata.service';



@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book:book;
  constructor(private router:Router,
    private BookdataService:BookdataService) { 
  }

  ngOnInit() {
  }
  bookinfo(){
    console.log("button clicked");
    this.BookdataService.setData(this.book);
    this.router.navigate(['book-info']);//redirects url to new component
  }

}
