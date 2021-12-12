package com.esprit.microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
private BookRepository bookRepository;


public Book addBook(Book book) {
return bookRepository.save(book);
}
public Book updateBook(int id, Book newBook) {
if (bookRepository.findById(id).isPresent()) {
Book existingBook = bookRepository.findById(id).get();
existingBook.setUid(newBook.getUid());
existingBook.setISBN(newBook.getISBN());
existingBook.setbookName(newBook.getbookName());
existingBook.setLink(newBook.getLink());

return bookRepository.save(existingBook);
} else
return null;
}

public String deleteBook(int id) {
if (bookRepository.findById(id).isPresent()) {
bookRepository.deleteById(id);
return "Book Deleted";
} else
return "Book Not Deleted";

}


}
