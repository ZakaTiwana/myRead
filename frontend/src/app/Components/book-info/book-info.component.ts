import { Component, OnInit } from '@angular/core';
import { BookdataService } from 'src/app/bookdata.service';
import { Router } from '@angular/router';
import { book } from 'src/app/models/book';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {
  book: book;

  constructor(private BookdataService: BookdataService) { }

  ngOnInit() {
    this.book = this.BookdataService.getData();
  }

}
