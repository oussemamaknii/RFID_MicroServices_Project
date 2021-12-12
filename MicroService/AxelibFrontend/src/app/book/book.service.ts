import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiServerUrl = 'http://localhost:8083';
  listBooks!: Book[];
  _embedded!:Object[];

  constructor(private http:HttpClient) { }
  public getBook(){
    return this.http.get<Book[]>('http://localhost:8083/books');
  }


  public deleteBook(isbn: number | undefined){
    console.log(isbn);

    return this.http.delete<any>(`${this.apiServerUrl}/books/${isbn}`);
  }

  public postBook(book:Book){
    return this.http.post(this.apiServerUrl+"/books",book)
  }
}
