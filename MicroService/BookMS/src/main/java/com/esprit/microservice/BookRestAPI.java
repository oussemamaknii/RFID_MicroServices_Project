package com.esprit.microservice;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")


@RestController
@RequestMapping(value = "/api/books")
public class BookRestAPI {
@Autowired
private BookService bookService;
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public ResponseEntity<Book> createBook(@RequestBody Book book) {
return new ResponseEntity<>(bookService.addBook(book), HttpStatus.OK);
}
@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Book> updateBook(@PathVariable(value = "id") int id,
    @RequestBody Book book){
return new ResponseEntity<>(bookService.updateBook(id, book), HttpStatus.OK);
}
@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteBook(@PathVariable(value = "id") int id){
return new ResponseEntity<>(bookService.deleteBook(id), HttpStatus.OK);
}
}