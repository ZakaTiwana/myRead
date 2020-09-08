import { Component, OnInit } from '@angular/core';
import { book } from 'src/app/models/book';
import { BookdataService } from 'src/app/bookdata.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-readbook',
  templateUrl: './readbook.component.html',
  styleUrls: ['./readbook.component.css']
})
export class ReadbookComponent implements OnInit {
  book: book;
  content: string = "";
  chapters: string[] = [];

  constructor(private BookdataService: BookdataService,
    private dataservice: DataService) { }

  ngOnInit() {
    this.book = this.BookdataService.getData();
    for (var val of this.book.chapters) {
      this.chapters.push(this.space_to_dash(val));
    }
  }
  space_to_dash(str) {
    return str.trim().replace(/\s+/g, "_");
  }

  getcontent(chapter: string) {

    // this.dataservice.getBookcontent(this.book.content.concat('/').concat(chapter)).subscribe();
    this.dataservice.getBookcontent(('/').concat(this.book._id).concat('/').concat(chapter)).subscribe(data => 
      this.content = data)

  }

}
