import { Component, OnInit} from '@angular/core';
import { book } from 'src/app/models/book';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books:book[];
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getBookRecord().subscribe(data=>{
      this.books=data;
    });
  }

}
