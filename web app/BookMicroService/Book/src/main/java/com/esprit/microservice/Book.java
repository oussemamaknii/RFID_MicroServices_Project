package com.esprit.microservice;


import java.io.Serializable;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Book implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue
    private int id;
    private String uid, ISBN,bookName;


    public int getId() {
    return id;
    }
    public String getUid() {
    return uid;
    }
    public void setUid(String uid) {
    this.uid = uid;
    }
    public String getISBN() {
    return ISBN;
    }
    public void setISBN(String ISBN) {
    this.ISBN = ISBN;
    }
    public String getbookName() {
    return bookName;
    }
    public void setbookName(String bookName) {
    this.bookName = bookName;
    }
    public Book() {
    super();
    // TODO Auto-generated constructor stub
    }
    public Book(String uid,String ISBN,String bookName) {
    super();
    this.uid = uid;
    this.bookName=bookName;
    this.ISBN=ISBN;
    }
}
