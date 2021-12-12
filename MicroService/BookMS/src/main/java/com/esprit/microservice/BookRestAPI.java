package com.esprit.microservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping(value = "/api/books")
public class BookRestAPI {
	
	
	
	
	@GetMapping("/books")
	public ResponseEntity<List<Book>> getAllCustomers() {
		BookRepository repository = null;
		try {
			List<Book> list = repository.findAll();
			
			if (list.isEmpty() || list.size() == 0) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
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