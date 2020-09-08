import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { author } from './models/author';
import { book } from './models/book';
import { authorAuthenticate } from './models/authorAuthenticate';
import { addbook } from './models/addbook';
import { editbook } from './models/editbook';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

const httpOptions_delete = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:3000/api';
  url2: string = 'http://localhost:3000/api/book';
  url3: string = 'http://localhost:3000/api/book/author/';
  url4: string = 'http://localhost:3000/api/author/book/';
  url5: string='http://localhost:3000/api/author/book';
  url6: string='http://localhost:3000/api/author/book/id';
  pass: string;
  constructor(private http: HttpClient) {

  }
  getBookRecord(): Observable<book[]> {
    return this.http.get<book[]>(this.url.concat("/book"));
  }
  getAuthorBookRecord(id:string): Observable<book[]> {
    return this.http.get<book[]>(this.url3.concat(id));
  }
  // getBookinfo():Observable<book>{
  //   return this.http.get<book>(this.url.concat("/book"));
  // }

  getBookcontent(url: string): Observable<string> {
    return this.http.get(this.url2.concat(url), { responseType: 'text' })

    // return this.http.get<string>(this.url2.concat(url));
  }
  deleteBook(id: string, token: string): Observable<any> {
    this.pass = "Bearer ".concat(token);
    // const header = new HttpHeaders().set('Content-Type', 'application/json')
    // .append('Authorization', this.pass);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').append('Authorization', this.pass);
    return this.http.delete(this.url4.concat(id), {headers:headers});
  }

  addbook(addbook: addbook,token: string): Observable<JSON> {
    this.pass = "Bearer ".concat(token);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').append('Authorization', this.pass);
    return this.http.post<JSON>(this.url5, addbook, {headers:headers});
  }
  updatebook(editbook: editbook,token: string): Observable<JSON> {
    this.pass = "Bearer ".concat(token);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').append('Authorization', this.pass);
    return this.http.put<JSON>(this.url6, editbook, {headers:headers});
  }


  login(author: author): Observable<authorAuthenticate> {
    return this.http.post<authorAuthenticate>(this.url.concat("/login"), author, httpOptions);
  }

  signup(author: author): Observable<JSON> {
    return this.http.post<JSON>(this.url.concat("/register"), author, httpOptions);
  }
}
