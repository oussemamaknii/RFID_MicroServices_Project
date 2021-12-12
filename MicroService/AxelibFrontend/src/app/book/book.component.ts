import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Book } from './Book';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  listBooks!: Book[];
  _embedded!:object[];
  book!:Book;

  constructor(private bookService: BookService,private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {


    this.refreshBooks();
    this.book= new Book();
  }

refreshBooks(){
  this.bookService.getBook().subscribe(
    (response: Book[])=>this.listBooks = JSON.parse(JSON.stringify(response))["_embedded"].books);

}
deleteBook(isbn: number | any){
  this.bookService.deleteBook(isbn).subscribe(
    (response: any) => {
      this.refreshBooks();
    },
    (error: HttpErrorResponse) => {
      this.refreshBooks();
    }
  );
}
onAddBook(){

  this.bookService.postBook(this.book).subscribe();
  setTimeout(()=>{ this.refreshBooks()}, 1000)  ;

}



public onOpenModal(book: Book): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#adduserModal');
  button.click();
}



public onClick(elementId: string): void { 
  this.viewportScroller.scrollToAnchor(elementId);}

public searchBooks(key: string): void {
  const results: Book[] = [];
  for (const user of this.listBooks) {
    if (
      user.bookName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(user);
    }
  }
  this.listBooks = results;
  if (results.length === 0 || !key) {
    this.refreshBooks();
  }
}

}
