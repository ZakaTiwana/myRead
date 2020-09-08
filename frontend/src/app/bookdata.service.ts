import { Injectable } from '@angular/core';
import { book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class BookdataService {
  private book: book;
  constructor() { }

  setData(book: book) {
    this.book = book;
  }

  getData(): book {
    return this.book;
  }
}