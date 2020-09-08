import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorAuthenticateService {
  private token: string = "";
  private id: string = "";
  constructor() { }
  setData(token: string) {
    this.token = token;
  }
  setID(id: string) {
    this.id = id;
  }

  getData(): string {
    return this.token;
  }
  getID(): string {
    return this.id;
  }
}
